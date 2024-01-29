import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { Alarm } from './alarm.entity';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AlarmDto } from './alarm.dto';

@Controller('alarm')
@ApiTags('alarm')
export class AlarmController {
    constructor(private readonly alarmService:AlarmService){}

    @Post()
    @ApiOperation({ summary: "알람 저장"})
    async save(@Body() alarm:Alarm, @Body() pot_id: number): Promise<number>{
        await this.alarmService.addAlarm(alarm, pot_id);
        return 1;
    }

    @Get(':pot_id')
    @ApiOperation({summary: '식물의 모든 알람 조회'})
    async findAll(@Param() pot_id: number): Promise<AlarmDto[]>{
        return await this.alarmService.findByPotId(pot_id);
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
