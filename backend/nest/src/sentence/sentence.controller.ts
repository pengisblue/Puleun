import { Body, Controller, Param, Post } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { ApiTags } from '@nestjs/swagger';
import { SentenceCreateDto } from './sentence-res.dto';

@Controller('sentence')
@ApiTags('sentence')
export class SentenceController {
    constructor(private readonly sentenceService: SentenceService){}

    @Post()
    async getAnswer(@Body() gpt: any): Promise<string>{
        return await this.sentenceService.answer(gpt.content); 
    }
    
}
