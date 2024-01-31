import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CollectionDto, CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
        // @InjectRepository(SelectPotDto)
        // private readonly dtoRepository: Repository<SelectPotDto>,
    ){}
        
    async findAll(): Promise<Pot[]>{
        return this.potRepository.find({
            relations: {calender: true}
        });
    }   

    async potDetail(pot_id: number): Promise<SelectPotDto>{
        const dto = await this.potRepository.createQueryBuilder('pot')
            .where({pot_id: pot_id, collection_FG: false})
            // pot.user AS user라는 뜻
            .leftJoinAndSelect('pot.user', 'user', 'user.user_id = pot.user_id')
            .select(['pot', 'user.user_id', 'user.nickname'])
            .getOne();
        return plainToClass(SelectPotDto, dto);
    }

    async save(potDto: Pot) {
        const testPot = this.potRepository.create(potDto)
        await this.potRepository.save(testPot);
    }

    // User에서 찾기
    // async findByUserId(user_id: number): Promise<Pot[]>{
    //     return await this.potRepository.findBy({user_id}); 
    // }

    async update(pot_id: number, data: UpdatePotDto){
        await this.potRepository.update(pot_id, {...data})
    }

    async delete(pot_id: number){
        await this.potRepository.softDelete(pot_id);
    }
    
    // User에서 찾기
    // async findCollection(user_id: number): Promise<CollectionDto[]>{
    //     const collection = await this.potRepository.find({
    //         withDeleted: true,
    //         where: {
    //             collection_FG: true,
    //             user_id: user_id
    //         }
    //     });

    //     return collection.map((pot) => CollectionDto.fromEntity(pot));
    // }
    // User에서 찾기
    // async collectionDetail(pot_id: number, user_id: number): Promise<CollectionDto>{
    //     const collectionPot = await this.potRepository.findOne({
    //         withDeleted: true,
    //         where: {
    //             user_id,
    //             pot_id,
    //             collection_FG: true,
    //         }
    //     });
    //     return CollectionDto.fromEntity(collectionPot);
    // }
}
