import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePotStateDto } from "src/pot-state/pot-state-insert.dto";
import { PotState } from "src/pot-state/pot-state.entity";
import { Repository } from "typeorm";

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

    // 대화 저장
    async saveSentence(){

    }
    
    //파일 저장
    async saveFile(){

    }

    //파일 전송
    async uploadFile(){

    }

}
