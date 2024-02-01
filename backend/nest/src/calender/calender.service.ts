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
    // async findAll(pot_id: number): Promise<Calender[]>{
    //     const entity = await this.calenderRepository.createQueryBuilder('calender')
    //         .where('calender.pot_id= :pot_id', {pot_id})
    //         .leftJoinAndSelect('calender.pot', 'pot')
    //         .select([
    //             'calender',
    //             'pot.pot_id',
    //             'pot.pot_name',
    //             'pot.pot_species'
    //         ]).getMany();
    //     return entity;
    // }
}
