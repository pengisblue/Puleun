import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { DeviceService } from './../device/device.service';
import { SocketLoginDto } from './socket.dto';
import { DeviceCreateDto } from 'src/device/device-req.dto';
import { SentenceService } from 'src/sentence/sentence.service';
import { TtsService } from 'src/tts/tts.service';
import { createClient } from 'redis';

@Injectable()
export class SocketService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sentenceService: SentenceService,
    private readonly ttsService: TtsService,
  ){}

  async login(serial_number: string): Promise<SocketLoginDto>{
    const device = await this.deviceService.findBySerialNumber(serial_number)
    const result = new SocketLoginDto
    result.serial_number = serial_number
    if (serial_number==null) throw new HttpException("plz serial_number", HttpStatus.BAD_REQUEST);
    if (device == null){
      const device = new DeviceCreateDto
      device.serial_number = serial_number
      device.empty_FG = false
      await this.deviceService.save(device)
      result.is_owner = false
      return result
    }
    result.is_owner = true
    if (device.pot_id != null) {
      result.pot_id = device.pot_id
      result.is_owner = false
    }
    
    const redisClient = createClient()
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect()
    await redisClient.set('key', 'value')
    console.log(await redisClient.get('key'));
    return result;
  }

  /** stt 받아서 tts로 return */
  async stt(text: string, talk_id: number, base64Data: string): Promise<string>{
    const saveFilePath = "./upload/2024-02-01/" + "푸른이와의 대화.mp3"
    const decodedBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(saveFilePath, decodedBuffer);

    // gpt api
    const answerText = await this.sentenceService.answer(text)
    
    const filePath = "./upload/2024-01-30/" + "ETA.wav"
    // message -> tts >> wav // 시간 안해봐서 모름
    await this.ttsService.tts(answerText, filePath)

    // client.emit(wav) 
    const content = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
        reject(err)
        } else {
        resolve(data)
        }
      })
    })

    // text, answerText 파일 저장 -> redis
    console.log(text)

    const redisClient = createClient()
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect()
    await redisClient.set('key', 'value')
    return Buffer.from(content).toString('base64')
  }

  /** 페이지 요청시 온습도 재측정 요청 */
  async refresh(){}
}
