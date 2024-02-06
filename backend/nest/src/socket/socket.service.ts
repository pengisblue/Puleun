import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { DeviceService } from './../device/device.service';
import { SocketLoginDto } from './socket.dto';
import { DeviceCreateDto } from 'src/device/device-req.dto';
import { SentenceService } from 'src/sentence/sentence.service';
import { TtsService } from 'src/tts/tts.service';
import { RedisService } from 'src/redis/redis.service';
import { FileService } from './../file/file.service';

@Injectable()
export class SocketService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sentenceService: SentenceService,
    private readonly ttsService: TtsService,
    private readonly redisService: RedisService,
    private readonly fileService: FileService,
  ){}

  // device 정보 + socket id 저장
  async login(clientId:string, serial_number: string): Promise<SocketLoginDto>{
    const device = await this.deviceService.findBySerialNumber(serial_number)
    const result = new SocketLoginDto
    result.serial_number = serial_number
    // 파라미터 없음
    if (serial_number==null) throw new HttpException("plz serial_number", HttpStatus.BAD_REQUEST);

    // redis에 소켓 id 저장
    await this.redisService.set(serial_number, clientId)

    // 처음온 연결인 경우
    if (device == null){
      const device = new DeviceCreateDto
      device.serial_number = serial_number
      device.empty_FG = false
      await this.deviceService.save(device)
      result.is_owner = false
      return result
    }
    // 이전 연결이 있는 경우
    result.is_owner = true
    if (device.pot_id != null) {
      result.pot_id = device.pot_id
      result.is_owner = false
    }
    return result;
  }

  /** stt-> tts : stt 받아서 tts로 return */
  async stt(text: string, talk_id: string, base64Data: string): Promise<string>{
    let sentenceId = this.redisService.incr(`${talk_id}:sentenceId`)
    const filePath ="./upload/talk/" + this.fileService.getToday()
    const saveFilePath =  filePath + talk_id + ".mp3"
    const decodedBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(saveFilePath, decodedBuffer);

    // gpt api
    const answerText = await this.sentenceService.answer(text)
    
    const uploadFilePath = filePath + (talk_id+1) + ".wav"
    // message -> tts
    await this.ttsService.tts(answerText, uploadFilePath)

    // client.emit
    const content = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(uploadFilePath, (err, data) => {
        if (err) {
        reject(err)
        } else {
        resolve(data)
        }
      })
    })

    // text, answerText 파일 저장 -> redis
    console.log(text)

    // !! nest module 'cacheManager' doesn't have array
    // '{talkId}:{sentenceId}':key, text:value
    await this.redisService.set(`${talk_id}:${sentenceId}`, text)
    await this.redisService.set(`${talk_id}:${sentenceId}:path`, saveFilePath)
    // sentenceId ++
    sentenceId = this.redisService.incr(`${talk_id}:sentenceId`)
    await this.redisService.set(`${talk_id}:${sentenceId}`, answerText)
    await this.redisService.set(`${talk_id}:${sentenceId}:path`, filePath)
    // if sentenceId//2 == 0 => child 
    // else AI
    return Buffer.from(content).toString('base64')
  }
}
