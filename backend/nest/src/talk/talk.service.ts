import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { Repository } from 'typeorm';
import { TalkDto } from './talk.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TalkService {
    constructor(@InjectRepository(Talk) private readonly talkRepository: Repository<Talk>,
                private readonly userService: UserService
    ){}

    async talkSave(talkDto: TalkDto){
        const dto = await this.talkRepository.save(talkDto);
        return plainToInstance(TalkDto, dto);
    }

    async talkDelete(talk_id: number): Promise<number>{
        await this.talkRepository.delete(talk_id);
        return 1;
    }

    async talkUpdate(talk_id: number, talkDto: TalkDto){
        await this.talkRepository.update(talk_id, talkDto);        
    }

    async talkFind(talk_id: number): Promise<Talk[]>{
        return await this.talkRepository.find({
            relations: {sentence: true},
            where: {talk_id},
        })
    }

    async findByUserId(user_id: number): Promise<User>{
        return await this.userService.findByUserIdInTalk(user_id);
    }

}
