import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Equal, Repository } from 'typeorm';
import { CollectionDto, CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';


@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
    ){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    async save(potDto: CreatePotDto) {
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

    async findCollection(user_id: number): Promise<CollectionDto[]>{
        const collection = this.potRepository.find({
            where: {
                collection_FG: Equal(true),
                user_id: Equal(user_id)
            }
        });

        const collectionDto: CollectionDto[] = (await collection).map((pot) => ({
            'pot_name':pot.pot_name,
            'pot_species':pot.pot_species,
            'createdAt':pot.createdAt,
            'deletedAt':pot.deletedAt,
            'pot_img_url':pot.pot_img_url,
            'happy_cnt':pot.happy_cnt,
        }));
 
        return collectionDto;
    }
}
