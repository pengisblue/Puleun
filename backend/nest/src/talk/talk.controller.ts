import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Talk } from './talk.entity';
import { User } from 'src/user/user.entity';
import { TalkDto } from './talk.dto';

@Controller('talk')
@ApiTags('talk')
export class TalkController {
    constructor(private readonly talkService: TalkService){}

    @Get('room/:talk_id')
    @ApiOperation({summary: '대화창 열기'})
    async findByTalkId(@Param('talk_id') talk_id: number): Promise<Talk[]>{
        return await this.talkService.talkFind(talk_id);
    }

    @Get(':user_id')
    @ApiOperation({summary: '대화 목록'})
    async findByUserId(@Param('user_id') user_id: number): Promise<User>{
        return await this.talkService.findByUserId(user_id);
    }

    @Post()
    @ApiOperation({summary: '대화 생성'})
    async talkSave(@Body() talkDto: TalkDto): Promise<number>{
        await this.talkService.talkSave(talkDto);
        return 1;
    }

    @Put()
    @ApiOperation({summary: '대화 제목 수정'})
    async titleUpdate(talk_id: number, @Body() talkDto: TalkDto): Promise<number>{
        await this.talkService.talkUpdate(talk_id, talkDto);
        return 1;
    }

    @Delete()
    @ApiOperation({summary: '대화방 삭제'})
    async talkDelete(talk_id: number): Promise<number>{
        await this.talkService.talkDelete(talk_id);
        return 1;
    }
}
