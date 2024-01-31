import socketio
from dotenv import load_dotenv
import os
import requests
import base64
import time
import pygame
import serial
import sys
from stt import record_wav, speech_to_text
sys.path.append('../hot-word')
import porcu

load_dotenv()

sio = socketio.Client()

pot_id = None # 식물 id
is_owner = False # 주인 연결 여부
is_connected = False # 백과 연결 여부
talk_id = None # 대화 번호

# 라즈베리와 백엔드 연결
@sio.event
def connect():
    print('Connect')
    # data = read_bluetooth_data()
    sio.emit('from_raspberry', 'Im raspberry')
    # sio.emit('from_raspberry', data)

@sio.event
def disconnect():
    print('Disconnect from server')


# def tts_http(): # http로 음성파일 받기
#     mp3 = requests.get("http://192.168.30.209:3000/file/ETA.mp3")
#     goToServer = requests.post("http://192.168.209.194:3000/file")
#     open("sample.mp3", "wb").write(mp3.content)

#---------------- 받기 --------------

@sio.on('tts')
def tts(data): # 음성 파일 받기
    # .wav 디코딩해서 재생하기
    
    print("receive")
    base64_data = data['base64Data']

  # base64 디코딩
    file_data = base64.b64decode(base64_data)

    # 파일로 저장 (ex: received_file.wav)
    with open('received_file.wav', 'wb') as file:
        file.write(file_data)

    print("File received and saved.")

    # 오디오 재생
    pygame.mixer.init()
    file_path = "/received_file.wav"

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


@sio.on('refresh')
def refresh(): # 새로고침 신호
    # state로 지금 측정한 데이터를 보내주면 됨
    # 아두이노야 측정해줘
    # 측정값을 받아서 보낸다. > pot_state
    print("refreshing...")
    pass


@sio.on('')
def emotion(): # 표정 상태값
    pass


@sio.on('owner_change')
def owner_change(data): # 주인 변했을때 == 주인이 생겼을때/없어졌을때
    is_owner = data
    print("owner status changed")


@sio.on('')
def get_talk_id(talk_id):
    talk_id = talk_id

#--------------- 보내기 ---------------

def hot_word(): # 호출어 인식
    talk_start = porcu()
    sio.emit('hot_word', {
        'talk_start': talk_start,
    })

def stt(): # 텍스트, 음성파일
    wav_file_path = "recorded_audio.wav"
    record_wav(wav_file_path)
    transcript = speech_to_text(wav_file_path)

    # WAV 파일을 Base64 인코딩하여 전송
    with open(wav_file_path, "rb") as wav_file:
        encoded_wav = base64.b64encode(wav_file.read()).decode('utf-8')

    sio.emit('stt', {
        'talk_id': talk_id, # 대화 번호
        'text': transcript, # STT text
        'file': encoded_wav # wav file
    })



def pot_state(): # 아두이노 측정값 + 물줬을때
    # 시리얼 통신 객체 생성
    ser = serial.Serial('/dev/ttyUSB0', 9600)  # 아두이노와의 통신 속도에 맞게 설정

    if ser.in_waiting > 0:
        sensor_value = ser.readline().decode('utf-8').strip()
        print(f'측정값: {sensor_value}')

        # Socket.IO로 데이터 전송
        sio.emit('sensor_data', {'value': sensor_value})




if __name__ == '__main__': # 메인 실행문
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    while True:
        pass



