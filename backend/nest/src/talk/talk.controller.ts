import { Controller, Get, Param, } from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TalkListDto } from './talk-res.dto';

@Controller('talk')
@ApiTags('talk')
export class TalkController {
    constructor(private readonly talkService: TalkService){}

    @Get('/:talk_id')
    @ApiOperation({summary: 'get talk detail (all sentence)', description:' talk.sentence.audio는 음성파일의 경로'})
    @ApiOkResponse({type:TalkListDto})
    async find(@Param('talk_id') talk_id: number): Promise<TalkListDto>{
        return await this.talkService.find(talk_id);
    }

    @Get('/all/:user_id')
    @ApiOperation({summary: 'get all talk list by user_id', description: '읽지않았다면 read_FG = 0, 읽었다면 read_FG = 1'})
    async findByUserId(@Param('user_id') user_id: number): Promise<TalkListDto[]>{
        return await this.talkService.findByUserId(user_id);
    }

}
