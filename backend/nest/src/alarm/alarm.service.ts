import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from './alarm.entity';
import { Repository } from 'typeorm';
import { AlarmDto, CreateAlarmDto } from './alarm.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AlarmService {
    constructor(@InjectRepository(Alarm)private readonly alarmRepository: Repository<Alarm>){}

    async addAlarm(alarm: CreateAlarmDto){
        await this.alarmRepository.save(alarm);
    }

    async deleteAlarm(alarm_id: number){
        await this.alarmRepository.delete(alarm_id);
    }

    async updateAlarm(alarm: AlarmDto, pot_id: number){
        await this.alarmRepository.update(pot_id, {...alarm});
    }

    async alarmDetail(alarm_id: number): Promise<Alarm>{
        return await this.alarmRepository.findOne({
            where: {alarm_id}
        });
    }
    // 초 분 시 일 월 요일
    // 0 - 6 일요일부터 토요일까지
    // 0 30 7 * * 1,3,6 -> 월 수 토 7시 30분 00초에 실행
    @Cron('0 * * * * *')
    handleCron(){
        console.log('Cron Test!');
    }
}
