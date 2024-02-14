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
    
    system_role: string =' 주변을 둘러보면 6살 어린이가 귀여운 미소를 지으며 다가와 당신의 친구가 되었습니다.' +
     '이 어린이는 항상 반말로 대화하며, 당신과 함께 시간을 보내고 싶어합니다.'+
     '당신도 이 어린이에가 항상 반말로 대답합니다.' +
     ' 당신은 어떻게 이 어린이와 친구 관계를 형성하고, 식물로서 어떤 특별한 경험을 공유할 것인가요? '
    my_role: string = "내 이름은 김연빈이고 6살 어린아이야";
    assistance_role: string = "안녕 친구야! 너를 또 만나서 행복해, 나에게 반말로 말을 걸어줘";

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
