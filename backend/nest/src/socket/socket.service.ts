import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { DeviceService } from './../device/device.service';
import { SocketLoginDto } from './socket.dto';
import { DeviceCreateDto } from 'src/device/device-req.dto';
import { SentenceService } from 'src/sentence/sentence.service';

@Injectable()
export class SocketService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sentenceService: SentenceService
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
    if (device.pot_id != null) result.pot_id = device.pot_id
    return result;
  }

  /** stt 받아서 tts로 return */
  async stt(text: string, talk_id: number, base64Data: string): Promise<string>{
    const filePath = "./upload/2024-02-01/" + "푸른이와의 대화.mp3"
    const decodedBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, decodedBuffer);

    // 답변 생성 (gpt api) -> sentence // 여기가 시간제일 많이
    const answerText = await this.sentenceService.answer(text)
    
    // message -> tts >> wav // 시간 안해봐서 모름
    

    // client.emit(wav) 
    const filePath2 = "./upload/2024-01-30/" + "ETA.mp3"
    const content = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filePath2, (err, data) => {
        if (err) {
        reject(err)
        } else {
        resolve(data)
        }
      })
    })

    // text, answerText 파일 저장 -> redis
    console.log(text)
    return Buffer.from(content).toString('base64')
  }

  /** 페이지 요청시 온습도 재측정 요청 */
  async refresh(){}

  /** 물준날 체크 */
  async water(): Promise<void>{

  }
}
