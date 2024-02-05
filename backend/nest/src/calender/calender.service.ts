import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';
import { CalenderCreateDto } from './calender-req.dto';

@Injectable()
export class CalenderService {
    constructor(@InjectRepository(Calender) private readonly calenderRepository: Repository<Calender>){}
    
    /** 식물의 캘린더 찾기 */
    async findCalenderByPotId(pot_id: number): Promise<Calender[]>{
        const entity = await this.calenderRepository.createQueryBuilder('calender')
            .where('calender.pot_id= :pot_id', {pot_id})
            .leftJoinAndSelect('calender.pot', 'pot')
            .select(['calender']).getMany();
        return entity;
    }

    /** */
    async save(calenderCreateDto: CalenderCreateDto): Promise<number>{
        await this.calenderRepository.save(calenderCreateDto)
        return 1;
    }


    async getLastWaterDay(pot_id: number): Promise<Date>{
        const temp = await this.calenderRepository.find({
            where: {pot_id: pot_id, code:'W'},
            order: {createdAt: 'DESC'},
            select: {createdAt: true},
            take: 1
        })
        return temp[0]?.createdAt;
    }
}
