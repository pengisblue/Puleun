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

    // 프롬프트 수정을 위해서 user_id를 받아와야 함
    async answer(sentence: string): Promise<string> {
        const system_role: string ="You are a very positive, kind, and loved by all. You must answer in Korean. Your name is Purun. My name is east, west, north, south, and south, and I am 7 years old. You are my best friend";
        const my_role: string = "I'm a little kid who wants to be close to you";
        const assistance_role: string = "Hello, my friend! You're here again today!";
        const completion = await this.openai.chat.completions.create({
            messages: [{"role": "system", "content": system_role},
                {"role": "user", "content": my_role},
                {"role": "assistant", "content": assistance_role},
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
