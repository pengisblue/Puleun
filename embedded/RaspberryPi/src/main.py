# main.py

# 모듈
import socketio
import os
import requests
import base64
import time
import serial
import sys
import datetime
import sounddevice as sd
import soundfile as sf
from dotenv import load_dotenv
from serial_number import get_serial_number
from stt import record_wav, speech_to_text
from hot_word.porcu import hotword
from threading import Thread

load_dotenv()

sio = socketio.Client()
pot_id = None # 식물 id
is_owner = False # 주인 연결 여부
is_connected = False # 백과 연결 여부
is_water = False # 백에 물 준 날 전송 여부 / day
status_flag = False # 백에 화분 상태 전송 여부 / hour
is_talking = False # 대화 중
talk_id = 1 # 대화 번호
serial_number = get_serial_number() # 시리얼 번호
transcript = None # stt 텍스트
encoded_wav = None # stt 음성파일
# 아두이노 포트 설정
arduino_port = 'COM6'
arduino_port_1 = '/dev/ttyACM0' # LCD
arduino_port_2 = '/dev/ttyUSB0' # nano

# ------------------------------------- 소켓 이벤트 핸들러 -------------------------------------

# 라즈베리와 백엔드 연결
@sio.event
def connect():
    print('Connected with serial number:', serial_number)

    # 시리얼 넘버 보내기
    sio.emit('login', {
        'serial_number': serial_number,
    })


# 연결 끊기
@sio.event
def disconnect():
    print('Disconnect from server')


# login 확인 시 받을 data
@sio.on('login_result')
def login_result(data):
    is_owner = data['is_owner'] # 주인 연결 여부 받기
    pot_id = data['pot_id'] # 화분 고유 id 받기
    print(data)


# 대화 중 tts 실행
@sio.on('tts')
def talk_tts(data):
    TTS(data)
    # 이 다음에 stt 실행
    # 이렇게 하니까 끊겨서 save_tts_file함수 안에서 stt를 실행했음


# 주인 변했을때 == 주인이 생겼을때/없어졌을때
# data==True일 때 이름 파일 받아서 저장
@sio.on('owner_change')
def owner_change(data): 
    # data={
    #     'is_owner': bool,
    #     'name_voice': wavfile,
    # }
    is_owner = data['is_owner']
    base64_name_voice = data['name_voice']
    name_voice_path = "name_voice.wav"
    save_sound(base64_name_voice, name_voice_path)

    print("owner status changed : ", is_owner)


# 대화 id 받기
@sio.on('talk_id')
def get_talk_id(talk_id):
    talk_id = talk_id  
    is_talking = True
    print('talk_id:', talk_id) 


# 새로고침 시 보낼 데이터
@sio.on('refresh')
def refresh(): # 새로고침 신호
    # state로 지금 측정한 데이터를 보내주면 됨
    # 아두이노야 측정해줘
    # 측정값을 받아서 보낸다. > pot_state
    print("refreshing...")
    pot_state()


# 상태 별 액션
@sio.on('situation')
def situation(data):
    # data = {
    #     'situation_id':int, # 상황번호
    #     'basic_voice':wav_file, # 기본멘트 음성파일(랜덤으로 보내주세요), 알람일땐 tts 파일
    # } 
    situation_id = data['situation_id']
    base64_basic_voice = data['basic_voice']
    basic_voice_path = "basic_voice.wav"

    # 대화 중이 아닐 경우
    if is_talking == False:
        # 효과음과 이름 음원 재생 + 멘트
        start_sound()
        save_sound(base64_basic_voice, basic_voice_path)
        play_sound(basic_voice_path)
        
        if situation_id == 5: # 알람일때
            send_sig_to_arduino(ser2, "alarm") # 팔 신호보내기
    
    # 대화 중일 경우 kill
    else:
        pass

    send_sig_to_arduino(ser1, situation_id) # lcd 바꾸기
    

# -------------------------------------------- 함수 ------------------------------------------------

# 음원 저장
def save_sound(encoded_data, file_path):
    file_data = base64.b64decode(encoded_data) # base64 디코딩

    # 파일로 저장 (ex: received_file.wav)
    with open(file_path, 'wb') as file:
        file.write(file_data)

    print(f"File saved to {file_path}.")
    time.sleep(1)


# 음성 재생
def play_sound(file_path):
    try:
        data, fs = sf.read(file_path)  # 파일 읽기
        sd.play(data, fs)  # 소리 재생
        sd.wait()  # 재생이 끝날 때까지 대기
    except Exception as e:
        print(f"재생 중 오류 발생: {e}")


# 효과음 + 이름 재생
def start_sound():
    effect_path = "effect_sound.wav"
    name_voice_path = "name_voice.wav"

    send_sig_to_arduino("talk start")
    play_sound(effect_path)  # 효과음 재생
    play_sound(name_voice_path)  # 이름 음성 파일 재생


# 호출어 인식
def keyword(): 
    hotword()
    sio.emit('hot_word') # 서버에게 hot_word 요청
    send_sig_to_arduino('hotword')
    print("키워드인식", talk_id)
    STT()   # 호출어 인식이 되면 stt 실행


# stt 텍스트, 음성파일 전송
def STT(): 
    global transcript, talk_id, encoded_wav
    stt_voice_path = "recorded_audio.wav"
    record_wav(stt_voice_path)
    transcript = speech_to_text(stt_voice_path)

    if transcript:
        print(transcript)
        # WAV 파일을 Base64 인코딩하여 전송
        with open(stt_voice_path, "rb") as wav_file:
            encoded_wav = base64.b64encode(wav_file.read()).decode('utf-8')

        sio.emit('stt', {
            'talk_id': talk_id, # 대화 번호
            'text': transcript, # STT text
            'file': encoded_wav, # wav file
        })
    else:
        # transcript 값이 없으면 대화 종료 로직을 수행
        is_talking = False
        return


# 음성 파일 저장 + 출력 함수
def TTS(data): 
    # lcd에 신호 보내기
    send_sig_to_arduino(ser1, 'start')

    base64_tts_voice = data['base64Data']
    tts_voice_path='tts_voice.wav'
    save_sound(base64_tts_voice, tts_voice_path)
    play_sound(tts_voice_path)

    send_sig_to_arduino(ser1, 0)
    STT()
    
    # pygame.mixer.init()
    # try:
    #     pygame.mixer.music.load(file_path)
    #     pygame.mixer.music.play()
        
    #     # 파일 재생이 완료될 때까지 대기
    #     while pygame.mixer.music.get_busy():
    #         pygame.time.Clock().tick(10)

    # except pygame.error as e:
    #     print("오류 발생:", e)
    # finally:
    #     print("File play done")
    #     pygame.mixer.quit()


# 아두이노 측정값 + 물줬을때, 아두이노에서 측정값 받고 보내기
def pot_state(): 
    # 측정 시작 신호 전송
    # ser2.write(b"START\n")
    print('start pot_state')

    # 시간 두고 아두이노가 신호 처리 하도록
    time.sleep(0.5) # 한번 측정할 정도의 시간임

    while ser2.in_waiting > 0:
        sensor_value = ser2.readline().decode('utf-8').strip()
        is_temp = False
        if (sensor_value[:1] == 'T'):
            sensor_value = float(sensor_value[1:])
            is_temp = True
        elif (sensor_value[:1] == 'M'):
            sensor_value = float(sensor_value[1:])
        print(sensor_value)

        # Socket.IO로 데이터 전송
        sio.emit('pot_state', {'pot_id' : pot_id, 'data': sensor_value, 'isTemp_FG': is_temp})


# 아두이노로 메시지 보내기
def send_sig_to_arduino(ser, msg):
    msg = msg + '\n'
    msg = bytes(msg, 'utf-8')
    ser.write(msg)

    # 테스트용으로 완료신호 받는 함수
    # time.sleep(1)

    # while ser2.in_waiting > 0:
    #     answer = ser2.readline().decode('utf-8').strip()
    #     print(answer)



# Threading
def arduino_work(ser2):
    while True:
        # water 들어오면 emit하기
        while ser2.in_waiting > 0:
            sensor_value = ser2.readline().decode('utf-8').strip()
            if (sensor_value == 'Water' and is_water == False):
                print('sending water signal')
                is_water = True
                # sio.emit('water', {'pot_id' : pot_id})

        # 정각마다 pot_state 실행
        now = datetime.datetime.now()
        if now.minute == 0:
            if status_flag == False:
                pot_state()
                status_flag = True
            if now.hour == 0:
                is_water = False


# test
def test():
    now = datetime.datetime.now()
    print(now)
    time.sleep(2)

# 메인 실행문
if __name__ == '__main__': 
    global ser1, ser2
    server_url = os.getenv('SERVER_URL')
    # sio.connect(server_url)

    # 시리얼 열기
    # 시리얼 통신 객체 생성
    # ser2 = serial.Serial(arduino_port, 9600)  # 아두이노와의 통신 속도에 맞게 설정 > 윈도우
    # ser1 = serial.Serial("COM5", 115200)  # 아두이노와의 통신 속도에 맞게 설정 > 윈도우
    ser1 = serial.Serial(arduino_port_1, 115200)  # TFT_LCD & arduino uno
    ser2 = serial.Serial(arduino_port_2, 9600)  # arduino nano    
    time.sleep(10) # 시리얼 통신 기다리기 (+ login 정보 받기?)
    pot_state() # 시작 시 보낼 데이터

    # ----- 내맘대로 만들어본 부분
    # thread 지정
    rasp = Thread(target=keyword, args=())
    ard = Thread(target=arduino_work, args=(ser2))
    # process 시작
    rasp.start()
    ard.start()
    while True:
        pass

    # -----------
    # keyword() # 호출어 인식 테스트

    # 메인 루프
    # while True:
        # keyword()

        # time.sleep(1)
        
        
    # -----
        
    # 시리얼 포트 닫기
    # ser.close()
    # print('serial close')

