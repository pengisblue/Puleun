import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { Alarm } from './alarm.entity';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AlarmDto, CreateAlarmDto } from './alarm.dto';
import { UserService } from 'src/user/user.service';

@Controller('alarm')
@ApiTags('Alarm')
export class AlarmController {
    constructor(private readonly alarmService:AlarmService,
                private readonly userService: UserService){}

    @Post()
    @ApiOperation({ summary: "알람 저장"})
    @ApiProperty({examples: {
        "alarm_name": "알람1",
        "alarm_content": "내용1",
        "active_FG": 0,
        'alarm_date': '2024-01-30',
        'pot':2
    }})
    async save(@Body() alarm:CreateAlarmDto): Promise<number>{
        console.log(alarm);
        await this.alarmService.addAlarm(alarm);
        return 1;
    }

    @Get(':user_id')
    @ApiOperation({summary: '유저의 모든 알람 조회'})
    @ApiBody({type: Alarm})
    async userAlarm(@Param('user_id') user_id: number){
        return await this.userService.allAlarmOfUser(user_id);
    }

    @Post(':alarm_id')
    @ApiOperation({summary: '특정 알람 조회'})
    @ApiBody({type:AlarmDto})
    async alarmDetail(@Param() alarm_id: number): Promise<Alarm>{
        return await this.alarmService.alarmDetail(alarm_id);
    }

    @Put(':alarm_id')
    @ApiOperation({summary: '알람 수정'})
    @ApiBody({type:AlarmDto})
    async update(@Param() alarm_id:number, alarmDto: AlarmDto): Promise<number>{
        await this.alarmService.updateAlarm(alarmDto, alarm_id);
        return 1;
    }

    @Delete(':alarm_id')
    @ApiOperation({summary: '알람 삭제'})
    @ApiBody({type:AlarmDto})
    async delete(@Param() alarm_id: number){
        await this.alarmService.deleteAlarm(alarm_id);
        return 1;
    }
}
