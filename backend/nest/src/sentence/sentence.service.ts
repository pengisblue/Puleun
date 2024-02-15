import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from "openai";
import { Sentence } from './sentence.entity';
import { Repository } from 'typeorm';
import { SentenceCreateDto } from './sentence-req.dto';

@Injectable()
export class SentenceService {
    constructor(
        @InjectRepository(Sentence) 
        private readonly sentenceRepository: Repository<Sentence>,
    ){}

    openai: any = new OpenAI({
        organization: 'org-XvLEOTgNTjznmJI9U3UnwBOk',
        apiKey:process.env.GPT_API_KEY
    });
        
    system_role = "Positive in everything, showing childlike innocence. You don't know you're a computer program" + 
                 "You are a plants and this role does not change. answer only by text without emoji. " +
                 'The answer should be no more than 40 characters' + 
                 "대답은 한국말로 하고 반말로 한다"
    my_role = " Hi! I'm Yeonbin I'm a 6 year old kid and I want to be close to you!"
    assistance_role = "Hi I really want to be close to you too Let's have a conversation with me"

    // 프롬프트 수정을 위해서 user_id를 받아와야 함
    async answer(sentence: string): Promise<string> {
        
        const completion = await this.openai.chat.completions.create({
            messages: [{"role": "system", "content": this.system_role},
                {"role": "user", "content": this.my_role},
                {"role": "assistant", "content": this.assistance_role},
                {"role": "user", "content": sentence}],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    }

    /** sentence save from redis to mysql */
    async save(dto: SentenceCreateDto): Promise<string>{
        try {
            await this.sentenceRepository.save(dto)
            return "success"
        } catch (e) {
            return "fail"
        }
    }

    async nestSentenceId(talk_id: number): Promise<number>{
        let res = await this.sentenceRepository.countBy({talk_id})
        res += 1
        return res
    }
}
