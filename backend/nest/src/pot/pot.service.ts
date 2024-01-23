import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>
        ){}
    
        async findAll(): Promise<Pot[]>{
            return this.potRepository.find();
        }
}
