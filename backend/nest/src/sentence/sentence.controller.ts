import { Body, Controller, Param, Post } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('sentence')
@ApiTags('Sentence')
export class SentenceController {
    constructor(private readonly sentenceService: SentenceService){}

    @Post()
    async getAnswer(@Body() gpt: any): Promise<string>{
        return await this.sentenceService.answer(gpt.content); 
    }
    
}
