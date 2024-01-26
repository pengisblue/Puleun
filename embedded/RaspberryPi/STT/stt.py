import sounddevice as sd
import numpy as np
import wave
import os
import json
from dotenv import load_dotenv
import google.cloud.speech as google_speech 

load_dotenv()
google_application_credentials=os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=google_application_credentials

def record_wav(file_path, duration=5, sample_rate=44100):
    print("Recording...")
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='int16')
    sd.wait()
    print("Recording complete.")

    print("Saving to WAV file...")
    wav_data = recording.flatten()
    write_wav(file_path, wav_data, sample_rate)
    print(f"File saved at: {file_path}")

def write_wav(file_path, data, sample_rate):
    with wave.open(file_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(data.tobytes())

def speech_to_text(file_path, language_code='ko-KR'):
    client = google_speech.SpeechClient()
    print("stt start")  

    with open(file_path, 'rb') as audio_file:
        content = audio_file.read()

    audio = google_speech.RecognitionAudio(content=content) 
    config = google_speech.RecognitionConfig(  
        encoding=google_speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code=language_code
    )

    print("continue....")
    response = client.recognize(config=config, audio=audio)

    # print("response: ",response)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))


if __name__ == "__main__":
    wav_file_path = "recorded_audio.wav"
    record_wav(wav_file_path)
    speech_to_text(wav_file_path)
