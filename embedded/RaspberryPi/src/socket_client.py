import socketio
from dotenv import load_dotenv
import os
import requests
import base64
import time
import sys
from stt import record_wav, speech_to_text
sys.path.append('../hot-word')
import porcu

load_dotenv()

sio = socketio.Client()

pot_id = None # 디바이스 id
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
def tts(): # 음성 파일 받기
    pass


@sio.on('')
def refresh(): # 새로고침 신호
    pass


@sio.on('')
def emotion(): # 표정 상태값
    pass


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


@sio.on('')
def pot_state(): # 아두이노 측정값 + 물줬을때
    pass



if __name__ == '__main__': # 메인 실행문
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    while True:
        pass



