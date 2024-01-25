import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Equal, IsNull, Not, Repository } from 'typeorm';
import { CollectionDto, CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { isDate } from 'util/types';


@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
    ){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find();
    }   

    async potDetail(pot_id: number): Promise<Pot>{
        return await this.potRepository.findOneBy({pot_id});
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
        await this.potRepository.softDelete(pot_id);
    }

    async findCollection(user_id: number): Promise<CollectionDto[]>{
        const collection = await this.potRepository.find({
            withDeleted: true,
            where: {
                deletedAt: Not(IsNull()),
                user_id: user_id
            }
        });

        return collection.map((pot) => CollectionDto.fromEntity(pot));
    }

    async collectionDetail(pot_id: number, user_id: number): Promise<CollectionDto>{
        const collectionPot = await this.potRepository.findOne({
            withDeleted: true,
            where: {
                user_id,
                pot_id,
                deletedAt: Not(IsNull())
            }
        });
        console.log(collectionPot);
        return CollectionDto.fromEntity(collectionPot);
    }
}
