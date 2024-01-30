import socketio
from dotenv import load_dotenv
import os
import requests


load_dotenv()

sio = socketio.Client()

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

# 얘도 이벤트 핸들러가 필요한가? ㄴㄴ
def tts(): # 음성파일 받기
    mp3 = requests.get("http://192.168.30.209:3000/file/ETA.mp3")
    goToServer = requests.post("http://192.168.209.194:3000/file")
    open("sample.mp3", "wb").write(mp3.content)



if __name__ == '__main__': # 메인 실행문
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    while True:
        pass



