import socketio
from dotenv import load_dotenv
import os
from bluetooth import read_bluetooth_data

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

if __name__ == '__main__':
    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)