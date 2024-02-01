import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
    constructor(private readonly ttsService: TtsService){}

    @Get(':voice')
    async getClovaVoice(@Res() res: Response, @Param('voice') voice: string ){
        await this.ttsService.tts(voice);
        return 'OK';
    }

}
