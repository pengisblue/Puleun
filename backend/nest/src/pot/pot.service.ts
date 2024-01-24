import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { CreatePotDto } from './create-pot.dto';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>
        ){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    async createPot(createPotDto: CreatePotDto): Promise<Pot>{
        const {potName, potSpecies} = createPotDto;
        const pot = new Pot();
        pot.pot_name = potName;
        pot.pot_species = potSpecies;
        return this.potRepository.save(pot);
        
    }   

}
