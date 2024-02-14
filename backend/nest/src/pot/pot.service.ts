import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { CollectionDto, CreatePotDto, PotWithStatusDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { PotStateService } from 'src/pot-state/pot-state.service';
import * as fs from 'fs';
import { join } from 'path';
import { DeviceService } from 'src/device/device.service';
import { S3Service } from 'src/s3/s3.service';
import { CalenderService } from 'src/calender/calender.service';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
        private readonly deviceService: DeviceService,
        @Inject(forwardRef(() => PotStateService))
        private readonly potStateService: PotStateService,    
        private readonly calenderService: CalenderService,    
        private readonly s3Service: S3Service,        
    ){}

    async findAllPot(): Promise<SelectPotDto[]>{
        const result = await this.potRepository.find({
            relations: {user: true}
        });
        return result;
    }
        
    async potWithStatus(parent_id: number): Promise<PotWithStatusDto[]>{
        const now = new Date();
        const pot = await this.potRepository.createQueryBuilder('pot')
        .select(['pot.pot_id', 'pot.pot_name', 'pot.pot_species','pot.planting_day', 
                        'user.parent_id', 'pot.temperature','pot.min_temperature', 'pot.max_temperature',
                        'pot.min_moisture', 'pot.max_moisture',
                        'pot.moisture', 'pot.pot_img_url', 'user.user_id', 'user.nickname',
                        'user.profile_img_url'])    
            .leftJoinAndSelect('pot.user', 'user', 'user.user_id = pot.user_id')
            .leftJoinAndSelect('pot.calender', 'calender','calender.pot_id = pot.pot_id')
            .andWhere('pot.user_id= :parent_id', {parent_id})
            .andWhere('pot.collection_FG= :flag', {flag: false})
            .andWhere('user.user_id= :parent_id', {parent_id})
            .orWhere('user.parent_id= :parent_id', {parent_id})                     
            .getMany();

        const statusDtos = new Array<PotWithStatusDto>();
        for(let i = 0; i < pot.length; i++){
            const statusDto = new PotWithStatusDto();
            const element = pot[i];
            const waterAndTalkDto = await this.calenderService.getLastTalkAndWater(element.pot_id);

            const water_calender_id = waterAndTalkDto.water_calender_id;
            const talk_calender_id = waterAndTalkDto.talk_calender_id;

            let lastWaterDay = 0;
            let lastTalkDay = 0;

            if(water_calender_id == null) lastWaterDay = 0;
            else lastWaterDay = Math.floor((now.getTime() - waterAndTalkDto.water_createdAt.getTime())/(1000 * 24 * 24 * 60));
    
            if(talk_calender_id == null) lastTalkDay = 0;
            else lastTalkDay = Math.floor((now.getTime() - waterAndTalkDto.talk_createdAt.getTime())/(1000 * 24 * 24 * 60));

            const together_day = await this.potStateService.theDayWeWereTogether(element.planting_day);
            const moisState = await this.potStateService.moisState(element.min_moisture, element.max_moisture, element.moisture);
            const tempState = await this.potStateService.tempState(element.min_temperature, element.max_temperature, element.temperature);

            statusDto.pot_id = element.pot_id;
            statusDto.pot_name = element.pot_name;
            statusDto.pot_img_url = element.pot_img_url;
            statusDto.pot_species = element.pot_species;
            statusDto.temperature = element.temperature;
            statusDto.moisture = element.moisture;            
            statusDto.user_id = element.user.user_id;
            statusDto.profile_img_url = element.user.profile_img_url;
            statusDto.nickname = element.user.nickname;
            statusDto.temp_state = tempState;
            statusDto.mois_state = moisState
            statusDto.last_water = lastWaterDay;
            statusDto.planting_day = element.planting_day;
            statusDto.together_day = together_day;
            statusDto.last_talk = lastTalkDay;
            statusDto.parent_id = element.user.parent_id;
            statusDtos.push(statusDto);
        }
        return statusDtos;
    }

    async potDetail(pot_id: number): Promise<PotWithStatusDto>{
        const now = new Date();
        const waterAndTalkDto = await this.calenderService.getLastTalkAndWater(pot_id);
        const water_calender_id = waterAndTalkDto.water_calender_id;
        const talk_calender_id = waterAndTalkDto.talk_calender_id;

        const pot = await this.potRepository.createQueryBuilder('pot')
        .select(['pot.pot_id', 'pot.pot_name', 'pot.pot_species','pot.planting_day', 
                 'user.parent_id', 'pot.temperature','pot.min_temperature', 'pot.max_temperature',
                 'pot.min_moisture', 'pot.max_moisture',
                 'pot.moisture', 'pot.pot_img_url', 'user.user_id', 'user.nickname',
                 'user.profile_img_url'])                         
        .leftJoin('pot.user', 'user', 'user.user_id = pot.user_id')
        .andWhere('pot.collection_FG= :flag', {flag: false})
        .andWhere('pot.pot_id= :pot_id', {pot_id})
        .getOne();

        const statusDto = new PotWithStatusDto();

        let lastWaterDay = 0;
        let lastTalkDay = 0;

        if(water_calender_id == null) lastWaterDay = 0;
        else lastWaterDay = Math.floor((now.getTime() - waterAndTalkDto.water_createdAt.getTime())/(1000 * 24 * 24 * 60));

        if(talk_calender_id == null) lastTalkDay = 0;
        else lastTalkDay = Math.floor((now.getTime() - waterAndTalkDto.talk_createdAt.getTime())/(1000 * 24 * 24 * 60));

        const together_day = await this.potStateService.theDayWeWereTogether(pot.planting_day);
        const moisState = await this.potStateService.moisState(pot.min_moisture, pot.max_moisture, pot.moisture);
        const tempState = await this.potStateService.tempState(pot.min_temperature, pot.max_temperature, pot.temperature);

        statusDto.pot_id = pot.pot_id;
        statusDto.pot_name = pot.pot_name;
        statusDto.pot_img_url = pot.pot_img_url;
        statusDto.pot_species = pot.pot_species;
        statusDto.temperature = pot.temperature;
        statusDto.moisture = pot.moisture;            
        statusDto.user_id = pot.user.user_id;
        statusDto.profile_img_url = pot.user.profile_img_url;
        statusDto.nickname = pot.user.nickname;
        statusDto.temp_state = tempState;
        statusDto.mois_state = moisState
        statusDto.last_water = lastWaterDay;
        statusDto.planting_day = pot.planting_day;
        statusDto.together_day = together_day;
        statusDto.last_talk = lastTalkDay;
        statusDto.parent_id = pot.user.parent_id;
        return statusDto;
    }  

    async save(createPotDto: CreatePotDto, file?: Express.Multer.File) {
        const pot: Pot = this.potRepository.create(createPotDto);
        const savePot = await this.potRepository.save(pot);
        // console.log(savePot);
        await this.calenderService.whenPotSave(savePot.pot_id);
        await this.deviceService.mappingPot(createPotDto.device_id, savePot.pot_id);

        const filePath = join('upload/pot/')
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const fileName = pot.pot_id + '.' + extension
            pot.pot_img_url = await this.s3Service.upload(file, filePath + fileName)
        } catch (e){
            pot.pot_img_url = 'upload/pot/noImg.png'
        }
        await this.potRepository.update(pot.pot_id,pot)
    }

    async update(pot_id: number, data: UpdatePotDto, file?: Express.Multer.File){
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const filePath ='upload/pot/'
            const fileName = pot_id + '.' + extension
            data.pot_img_url = await this.s3Service.upload(file, filePath + fileName)
        } catch (e){
            data.pot_img_url = 'upload/pot/noImg.png'
        }
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

    async find(pot_id:number): Promise<Pot>{
        const [pot] = await this.potRepository.find({relations:{user:true}, where:{pot_id}, take:1})
        return pot
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
