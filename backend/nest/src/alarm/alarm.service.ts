import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from './alarm.entity';
import { Repository } from 'typeorm';
import { AlarmDto, CreateAlarmDto } from './alarm.dto';

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

}
