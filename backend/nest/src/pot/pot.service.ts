import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { PotDto } from './pot.dto';
import { create } from 'domain';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    async createPot(potDto: PotDto) {
        const pot = new Pot();
        pot.pot_name = potDto.potName;
        pot.pot_id = potDto.potId;
        pot.pot_species = potDto.potSpecies;
        await this.potRepository.save(pot);
    }
}
