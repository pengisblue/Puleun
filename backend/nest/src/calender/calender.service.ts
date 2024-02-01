import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';
import { SelectCalenderDto } from './calender.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CalenderService {
    constructor(@InjectRepository(Calender) private readonly calenderRepository: Repository<Calender>){}
    
    async findCalenderByPotId(pot_id: number): Promise<Calender[]>{
        const entity = await this.calenderRepository.createQueryBuilder('calender')
            .where('calender.pot_id= :pot_id', {pot_id})
            .leftJoinAndSelect('calender.pot', 'pot')
            .select(['calender']).getMany();
        return entity;
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
