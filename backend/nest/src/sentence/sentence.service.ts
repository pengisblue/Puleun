import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from "openai";
import { Sentence } from './sentence.entity';
import { Repository } from 'typeorm';
import { SentenceDto } from './sentence.dto';

@Injectable()
export class SentenceService {
    constructor(@InjectRepository(Sentence) private readonly sentenceRepository: Repository<Sentence>){}

    openai: any = new OpenAI({
        organization: 'org-XvLEOTgNTjznmJI9U3UnwBOk',
        apiKey:process.env.GPT_API_KEY
    });
    
    system_role: string ="You are a very positive, kind, and loved by all. You must answer in Korean. Your name is Purun. My name is east, west, north, south, and south, and I am 7 years old. You are my best friend";
    my_role: string = "I'm a little kid who wants to be close to you";
    assistance_role: string = "Hello, my friend! You're here again today!";

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

    // 별을 찍은걸 redis로 보내기?
    async sentenceSave(dto: SentenceDto): Promise<SentenceDto>{
        return await this.sentenceRepository.save(dto);
    }

    async sentenceFindAll(talk_id: number): Promise<SentenceDto[]>{
        return await this.sentenceRepository.find({
            where: {talk_id}
        })
    }
}
