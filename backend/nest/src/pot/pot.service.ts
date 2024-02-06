import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CollectionDto, CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
    ){}


    async findAllPot(): Promise<SelectPotDto[]>{
        const result = await this.potRepository.find();
        return plainToInstance(SelectPotDto, result);
    }
        

    async potDetail(pot_id: number): Promise<Pot>{
        const dto = await this.potRepository.createQueryBuilder('pot')
            .where({pot_id: pot_id, collection_FG: false})
            // pot.user AS user라는 뜻
            .leftJoinAndSelect('pot.user', 'user', 'user.user_id = pot.user_id')
            .select(['pot', 'user.user_id', 'user.nickname'])
            .getOne();
        return dto;
    }

    async save(createPotDto: CreatePotDto) {
        await this.potRepository.save(createPotDto);
    }

    async update(pot_id: number, data: UpdatePotDto){
        await this.potRepository.update(pot_id, {...data})
    }

    async delete(pot_id: number){
        await this.potRepository.softDelete(pot_id);
    }

    async findPotsByUserId(user_id: number): Promise<Pot[]> {
        return this.potRepository.createQueryBuilder('pot')
          .where('pot.user_id = :user_id', { user_id })
          .andWhere('pot.collection_FG= :FG ', {FG: 0})
          // 첫번째 파라미터는 repository의 엔티티의 연관관계가 잡힌 필드의 이름
          // 두번째 파라미터는 해당 alias
            //   .leftJoinAndSelect('pot.user', 'user')
          .select([
            'pot.pot_id', 'pot.pot_name', 'pot.pot_name',
            'pot.pot_img_url', 'pot.min_temperature', 'pot.max_temperature',
            'pot.min_moisture', 'pot.max_moisture', 'pot.createdAt', 'pot.pot_img_url',
            'pot.temperature', 'pot.moisture'
          ])
          .getMany();
      }

    async collectionDetail(pot_id: number): Promise<Pot>{
        const result = await this.potRepository.findOne({
            where: {pot_id: pot_id}
        })
        return result;
    }

    async findCollection(pot_id: number): Promise<CollectionDto[]> {
        return await this.potRepository.createQueryBuilder('pot')
            .where({pot_id: pot_id})
            .andWhere('pot.collection_FG= :flag', {flag: 1})
            .leftJoinAndSelect('pot.user', 'user')
            .select(['pot.pot_id', 'pot.pot_name', 'pot.pot_species'
                ,'user.user_id', 'user.nickname'
            ])
            .getMany();
    }

    async toCollection(pot_id: number){
        await this.potRepository.update(pot_id, {collection_FG: true});
    }

    
    async calenderWithCurrentMoisAndTemp(pot_id: number): Promise<Pot>{
        return await this.potRepository.findOne({
            where: {pot_id},
            select: {temperature: true, moisture: true}
        })
    }
}
