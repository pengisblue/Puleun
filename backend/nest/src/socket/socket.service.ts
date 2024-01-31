import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePotStateDto } from "src/pot-state/pot-state-insert.dto";
import { PotState } from "src/pot-state/pot-state.entity";
import { Repository } from "typeorm";
import * as fs from 'fs';
import { error } from 'console';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(PotState)
        private readonly potStateRepository: Repository<PotState>,
    ){}

    // 온도,습도 DB 저장
    async saveState(inputDto: CreatePotStateDto): Promise<number>{
        await this.potStateRepository.save(inputDto)
        return 1;
    }

    async stt(txt: string, base64Data: string): Promise<string>{
        // txt 파일 저장 -> redis

        // 답변 생성 (gpt api) -> sentence // 여기가 시간제일 많이
        // message -> tts >> wav // 시간 안해봐서 모름
        
        // client.emit(wav) 
        const filePath = "./upload/2024-01-30/" + "ETA.mp3"
        const content = await new Promise<Buffer>((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
              if (err) {
                reject(err)
              } else {
                resolve(data)
              }
            })
        })
        if (typeof content == typeof error) throw ExceptionsHandler
        
        return Buffer.from(content).toString('base64')
    }
}
