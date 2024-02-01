# main.py

# 모듈
import socketio
import os
import requests
import base64
import time
import pygame
import serial
import sys
from dotenv import load_dotenv
from serial_number import get_serial_number
from stt import record_wav, speech_to_text
from hot_word.porcu import hotword

load_dotenv()

sio = socketio.Client()
pot_id = None # 식물 id
is_owner = False # 주인 연결 여부
is_connected = False # 백과 연결 여부
talk_id = None # 대화 번호
# serial_number = get_serial_number() # 시리얼 번호
serial_number = 'jkfjksdjs12331'
transcript = None # stt 텍스트
encoded_wav = None # stt 음성파일


# ------------------------------------- 소켓 이벤트 핸들러 -------------------------------------

# 라즈베리와 백엔드 연결
@sio.event
def connect():
    global serial_number
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
    global is_owner, pot_id
    is_owner = data['is_owner'] # 주인 연결 여부 받기
    pot_id = data['pot_id'] # 화분 고유 id 받기
    print(data)


# 대화 중 tts 실행
@sio.on('tts')
def talk_tts(data):
    save_tts_file(data)


# 알람이 왔을 때 tts 실행
@sio.on('alarm')
def alarm_tts(data):
    save_tts_file(data)  


# 주인 변했을때 == 주인이 생겼을때/없어졌을때
@sio.on('owner_change')
def owner_change(data): 
    is_owner = data
    print("owner status changed")


# 대화 id 받기
@sio.on('talk_id')
def get_talk_id(talk_id):
    talk_id = talk_id   


# 새로고침 시 보낼 데이터
@sio.on('refresh')
def refresh(): # 새로고침 신호
    # state로 지금 측정한 데이터를 보내주면 됨
    # 아두이노야 측정해줘
    # 측정값을 받아서 보낸다. > pot_state
    print("refreshing...")


# 표정 상태값
@sio.on('')
def emotion(data):
    pass

# -------------------------------------------- 함수 ------------------------------------------------

# stt 텍스트, 음성파일 전송
def send_stt_file(): 
    global transcript, talk_id, encoded_wav
    wav_file_path = "recorded_audio.wav"
    record_wav(wav_file_path)
    transcript = speech_to_text(wav_file_path)
    
    # transcript의 값이 있을 경우 emit
    if transcript:
        print(transcript)
        
        # WAV 파일을 Base64 인코딩하여 전송
        with open(wav_file_path, "rb") as wav_file:
            encoded_wav = base64.b64encode(wav_file.read()).decode('utf-8')

        sio.emit('stt', {
            'talk_id': talk_id, # 대화 번호
            'text': transcript, # STT text
            'file': encoded_wav, # wav file
        })
    else:
        # transcript 값이 없으면 대화 종료 로직을 수행
        return


# 호출어 인식
def keyword(): 
    hotword()
    sio.emit('hot_word') # 서버에게 hot_word 요청
    send_stt_file()   # 호출어 인식이 되면 stt 실행     


# 음성 파일 저장 + 출력 함수
def save_tts_file(data): 
    # .wav 디코딩해서 재생하기
    base64_data = data['base64Data']
    file_data = base64.b64decode(base64_data) # base64 디코딩

    # 파일로 저장 (ex: received_file.wav)
    with open('received_file.wav', 'wb') as file:
        file.write(file_data)

    print("File received and saved.")

    # 오디오 재생
    pygame.mixer.init()
    file_path = "received_file.wav"

    try:
        pygame.mixer.music.load(file_path)
        pygame.mixer.music.play()
        
        # 파일 재생이 완료될 때까지 대기
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)

    except pygame.error as e:
        print("오류 발생:", e)
    finally:
        print("File play done")
        pygame.mixer.quit()


# 아두이노 측정값 + 물줬을때
def pot_state(): 
    # 시리얼 통신 객체 생성
    ser = serial.Serial('serial_number/dev/ttyUSB0', 9600)  # 아두이노와의 통신 속도에 맞게 설정

    if ser.in_waiting > 0:
        sensor_value = ser.readline().decode('utf-8').strip()
        print(f'측정값: {sensor_value}')

        # Socket.IO로 데이터 전송
        sio.emit('sensor_data', {'value': sensor_value})


# 메인 실행문
if __name__ == '__main__': 
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    keyword() # 호출어 인식 테스트
    # stt()  # STT 실행문 테스트

    # 메인 루프
    while True:
        pass

