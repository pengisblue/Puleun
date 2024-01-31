import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';
import { SelectCalenderDto } from './calender.dto';

@Injectable()
export class CalenderService {
    constructor(@InjectRepository(Calender) private readonly calenderRepository: Repository<Calender>){}
    
    async findAll(): Promise<SelectCalenderDto[]>{
        const entity = await this.calenderRepository.find({
            relations: ['pot']
        });
        return entity.map((calender) => SelectCalenderDto.fromEntity(calender));
    }
}
