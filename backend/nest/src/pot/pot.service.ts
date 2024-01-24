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
        pot.createdAt = potDto.createdAt;
        pot.deletedAt = potDto.deletedAt;
        pot.updatedAt = potDto.updatedAt;
        pot.min_temperature = potDto.min_temperature;
        pot.max_temperature = potDto.max_temperature;
        pot.min_moisture = potDto.min_moisture;
        pot.max_moisture = potDto.max_moisture;
        pot.pot_img_url = potDto.pot_img_url;
        await this.potRepository.save(pot);
    }
}
