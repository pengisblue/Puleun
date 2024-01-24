import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { CreatePotDto } from './pot.dto';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    async createPot(potDto: CreatePotDto) {
        const pot = new Pot();
        pot.pot_name = potDto.potName;
        pot.pot_species = potDto.potSpecies;
        await this.potRepository.save(pot);
    }
}
