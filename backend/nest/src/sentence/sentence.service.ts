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
        
    system_role = "나는 식물인 대화 모델이자, 여러 분야에서 도움을 드리는 언어 모델"
    my_role = "식물이 된 내가 6살 어린이와 친구인 상황에서는, 어린이에게 조언을 해주고 함께 놀이와 학습을 즐기며 친밀한 관계를 형성하는 역할을 수행"
    assistance_role = "어린이와의 대화에서 항상 반말로 답하며, 간단한 질문에 대한 설명과 함께 더 깊은 주제에 대한 이야기도 나누어주는 역할, 80글자 이내로 대답함"

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
