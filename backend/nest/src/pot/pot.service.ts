import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
    ){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    /**
     * 
     * @param potDto 
     *  {
            "pot_name":"",
            "pot_species":"",
            "pot_img_url": ""
        }
     */
    async createPot(potDto: CreatePotDto) {
        const testPot = this.potRepository.create(potDto)
        await this.potRepository.save(testPot);
    }

    async findByUserId(user_id: number): Promise<Pot[]>{
        return await this.potRepository.findBy({user_id}); 
    }

    async update(pot_id: number, data: UpdatePotDto){
        await this.potRepository.update(pot_id, {...data})
    }

    async delete(pot_id: number){
        await this.potRepository.delete(pot_id);
    }


}
