import socketio
from dotenv import load_dotenv
import os
import requests
import base64
import time
import pygame


load_dotenv()

sio = socketio.Client()

pot_id = None # 식물 id
is_owner = False # 주인 연결 여부
is_connected = False # 백과 연결 여부

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

#--------------- 보내기 ---------------

@sio.on('stt')
def stt(): # 텍스트, 음성파일
    pass


@sio.on('')
def pot_state(): # 아두이노 측정값 + 물줬을때
    pass



if __name__ == '__main__': # 메인 실행문
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    while True:
        pass



