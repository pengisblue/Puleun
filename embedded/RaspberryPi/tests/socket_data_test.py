import socketio
import base64
import time

sio = socketio.Client()
url = "http://192.168.30.209:8080/socket"

sio.connect(url)

sio.emit('stt',{
  "txt":"hi",
  "file":""
})

@sio.on('tts')
def receive_file_data(data):
    base64_data = data['base64Data']

    # base64 디코딩
    file_data = base64.b64decode(base64_data)

    # 파일로 저장 (예: received_file.txt)
    with open('received_file.wav', 'wb') as file:
        file.write(file_data)

    print("File received and saved.")

time.sleep(100)