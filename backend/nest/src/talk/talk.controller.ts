import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Talk } from './talk.entity';
import { User } from 'src/user/user.entity';
import { TalkListDto } from './talk-res.dto';

@Controller('talk')
@ApiTags('talk')
export class TalkController {
    constructor(private readonly talkService: TalkService){}

    @Get('/:talk_id')
    @ApiOperation({description: 'get talk detail (all sentence)'})
    @ApiOkResponse({type:Talk})
    async findByTalkId(@Param('talk_id') talk_id: number): Promise<Talk[]>{
        return await this.talkService.findAll(talk_id);
    }

    @Get('/all/:user_id')
    @ApiOperation({description: 'get all talk list by user_id'})
    async findByUserId(@Param('user_id') user_id: number): Promise<TalkListDto[]>{
        return await this.talkService.findByUserId(user_id);
    }


    @Put()
    @ApiOperation({summary: 'talk save redis to database'})
    async titleUpdate(talk_id: number): Promise<number>{
        await this.talkService.updateTalk(talk_id);
        return 1;
    }
}
