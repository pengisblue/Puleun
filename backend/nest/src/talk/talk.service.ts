import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { Repository } from 'typeorm';
import { TalkDto } from './talk.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RedisService } from 'src/redis/redis.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { SentenceCreateDto } from 'src/sentence/sentence-res.dto';

@Injectable()
export class TalkService {
    constructor(
        @InjectRepository(Talk) 
        private readonly talkRepository: Repository<Talk>,
        private readonly userService: UserService,
        private readonly redisService: RedisService,
        private readonly sentenceService: SentenceService,
    ){}

    /** save talk from redis to Mysql */
    async saveTalk(talk_id: number): Promise<string>{
        try {
            const talkArray = (await this.redisService.get(`${talk_id}:array`)).split(".")
            for (const sentence of talkArray) {
                const sentenceJson: SentenceCreateDto= JSON.parse(sentence)
                const res = await this.sentenceService.save(sentenceJson)
                if (res=="fail") console.log(`wrong data in talk ${talk_id} : ${talkArray.toString}`)
            }
            return "success"
        } catch (e) {
            return "fail"
        }
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

    /** get talk_id */
    async talkStart(): Promise<number>{
        return this.redisService.getTalkId()
    }
}
