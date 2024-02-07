import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RedisService } from 'src/redis/redis.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { SentenceCreateDto } from 'src/sentence/sentence-res.dto';
import { TalkCreateDto } from './talk-req.dto';
import { TalkListDto } from './talk-res.dto';

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
    async updateTalk(talk_id: number): Promise<string>{
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

    /** make talk by talk start */
    async saveTalk(talk_title: string, talk_DT: string){
        const dto:TalkCreateDto = new TalkCreateDto()
        const DT = talk_DT as unknown as Date
        dto.talk_DT = DT
        dto.talk_title = talk_title
        this.talkRepository.save(dto)
    }

    async findAll(talk_id: number): Promise<Talk[]>{
        return await this.talkRepository.find({
            relations: {sentence: true},
            where: {talk_id},
        })
    }

    async findByUserId(user_id: number): Promise<TalkListDto[]>{
        return await this.talkRepository.createQueryBuilder('talk')
            .select(['talk.talk_id',
                    'talk.talk_title',
                    'talk.talk_DT',
                    'talk.read_FG'])
            .leftJoin('talk.pot','pot','talk.pot_id = pot.pot_id')
            .leftJoin('pot.user', 'user','pot.user_id = user.user_id')
            .where('user.user_id = :user_id',{user_id})
            .getMany()
    }

    /** get talk_id */
    async talkStart(): Promise<number>{
        return this.redisService.getTalkId()
    }
}
