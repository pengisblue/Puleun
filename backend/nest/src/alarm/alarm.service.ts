import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from './alarm.entity';
import { Repository } from 'typeorm';
import { AlarmDto, CreateAlarmDto } from './alarm.dto';
import { Pot } from 'src/pot/pot.entity';
import { plainToClass } from 'class-transformer';

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

    async userAlarm(pot_id: number): Promise<Alarm[]>{
        const alarm = await this.alarmRepository.createQueryBuilder('alarm')
            .where('alarm.pot_id= :pot_id', {pot_id})
            .leftJoinAndSelect('alarm.pot', 'pot')
            .select([
                'alarm.alarm_id', 'alarm.alarm_name', 'alarm.alarm_content',
                 'alarm.active_FG', 'alarm.alarm_date', 'alarm.routine',
                 'pot.pot_id', 'pot.pot_name'
            ])
            .getMany();
        return alarm;
    }
}
