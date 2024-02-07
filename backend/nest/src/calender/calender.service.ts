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

    /** save "W" day or "T" day*/
    async save(calenderCreateDto: CalenderCreateDto): Promise<string>{
        const res = this.getLastDay(calenderCreateDto.pot_id, calenderCreateDto.code)
        if (!res) await this.calenderRepository.save(calenderCreateDto)
        return "success";
    }

    async findAllCalender(): Promise<Calender[]>{
        return await this.calenderRepository.find();
    }

    async getLastDay(pot_id: number, code:string):Promise<Date>{
        const temp = await this.calenderRepository.findOne({
            where: {pot_id, code},
            order: {createdAt: 'DESC'},
            select: {createdAt: true}
        })
        return temp[0]?.createdAt;
    }
}
