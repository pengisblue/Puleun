import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { DeviceService } from './../device/device.service';
import { SocketLoginDto } from './socket.dto';
import { DeviceCreateDto } from 'src/device/device-req.dto';
import { SentenceService } from 'src/sentence/sentence.service';
import { TtsService } from 'src/tts/tts.service';
import { FileService } from './../file/file.service';
import { SentenceCreateDto } from 'src/sentence/sentence-req.dto';

@Injectable()
export class SocketService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sentenceService: SentenceService,
    private readonly ttsService: TtsService,
    private readonly fileService: FileService,
  ){}

  // device 정보 + socket id 저장
  async login(clientId:string, serial_number: string): Promise<SocketLoginDto>{
    const device = await this.deviceService.findBySerialNumber(serial_number)
    const result = new SocketLoginDto
    result.serial_number = serial_number
    // 파라미터 없음
    if (serial_number==null) throw new HttpException("plz serial_number", HttpStatus.BAD_REQUEST);

    // 소켓 id 저장 해야함


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
  async stt(text: string, talk_id: number, base64Data: string): Promise<string>{
    const today = this.fileService.getToday()
    const filePath = "./upload/talk/" + today + "/"
    if (!fs.existsSync(filePath)) fs.mkdir(filePath, (e)=>{if (e) throw e})

    let nextSentenceId = await this.sentenceService.nestSentenceId(talk_id)
    const saveFilePath =  filePath + talk_id + "-" + nextSentenceId + ".mp3"
    const decodedBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(saveFilePath, decodedBuffer);

    const sentenceDto = new SentenceCreateDto()
    sentenceDto.content = text
    sentenceDto.audio = saveFilePath
    sentenceDto.sentence_DTN = today as unknown as Date
    sentenceDto.talker = "user"
    sentenceDto.talk_id = talk_id
    await this.sentenceService.save(sentenceDto)
    // gpt api
    const answerText = await this.sentenceService.answer(text)
    
    const uploadFilePath = filePath + talk_id + "-" + (nextSentenceId+1) + ".wav"
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
    
    const sentenceDto2 = new SentenceCreateDto()
    sentenceDto2.content = answerText
    sentenceDto2.audio = uploadFilePath
    sentenceDto.sentence_DTN = today as unknown as Date
    sentenceDto2.talker = "ai"
    sentenceDto2.talk_id = talk_id
    await this.sentenceService.save(sentenceDto2)

    return Buffer.from(content).toString('base64')
  }
}
