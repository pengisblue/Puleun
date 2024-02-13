import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { Repository } from 'typeorm';
import { TalkListDto } from './talk-res.dto';
import { FileService } from './../file/file.service';

@Injectable()
export class TalkService {
    constructor(
        @InjectRepository(Talk) 
        private readonly talkRepository: Repository<Talk>,
        private readonly fileService: FileService,
    ){}

    
    /** make talk by talk start */
    async saveTalk(pot_id: number, talk_title: string): Promise<number>{
        const dto:Talk = new Talk()
        const talk_DT = this.fileService.getToday()
        dto.talk_DT = talk_DT
        dto.talk_title = talk_title
        dto.pot_id = pot_id
        await this.talkRepository.save(dto)
        return dto.talk_id
    }
    
    /** find all sentence by talk_id */
    async find(talk_id: number): Promise<TalkListDto>{
        const [res] = await this.talkRepository.find({
            select: ['talk_id', 'talk_title', 'talk_DT'],
            relations: ['sentences'],
            where: {talk_id},
            take: 1
        })
        await this.talkRepository.update(talk_id, {read_FG: true});
        return res
    }
    
    /** find all talk list by user_id */
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
}

// /** save talk from redis to Mysql */
// async updateTalk(talk_id: number): Promise<string>{
//     try {
//         const talkArray = (await this.redisService.get(`${talk_id}:array`)).split(".")
//         for (const sentence of talkArray) {
//             const sentenceJson: SentenceCreateDto= JSON.parse(sentence)
//             const res = await this.sentenceService.save(sentenceJson)
//             if (res=="fail") console.log(`wrong data in talk ${talk_id} : ${talkArray.toString}`)
//         }
//         return "success"
//     } catch (e) {
//         return "fail"
//     }
// }