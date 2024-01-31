import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalenderService {
    constructor(@InjectRepository(Calender) private readonly calenderRepository: Repository<Calender>){}
    
    async findAll(): Promise<Calender[]>{
        return await this.calenderRepository.find();
    }
}
