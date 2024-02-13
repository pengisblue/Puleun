import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';
import { CalenderCreateDto } from './calender-req.dto';
import { FileService } from './../file/file.service';

@Injectable()
export class CalenderService {
    constructor(
        @InjectRepository(Calender) 
        private readonly calenderRepository: Repository<Calender>,
        private readonly fileService:FileService,
    ){}
    
    /** 식물의 캘린더 찾기 */
    async findCalenderByPotId(pot_id: number): Promise<Calender[]>{
        const entity = await this.calenderRepository.createQueryBuilder('calender')
            .where('calender.pot_id= :pot_id', {pot_id})
            .leftJoinAndSelect('calender.pot', 'pot')
            .select(['calender']).getMany();
        return entity;
    }

    /** save "W" day or "T" day*/
    async save(calenderCreateDto: CalenderCreateDto): Promise<string>{
        const res = await this.getLastDay(calenderCreateDto.pot_id, calenderCreateDto.code)
        const today: Date = this.fileService.getToday() as unknown as Date
        if (!res || (res.getFullYear() == today.getFullYear()
                && res.getMonth() == today.getMonth()
                && res.getDate() == today.getDate())) await this.calenderRepository.save(calenderCreateDto)
        return "success";
    }

    async findAllCalender(): Promise<Calender[]>{
        return await this.calenderRepository.find();
    }

    async getLastDay(pot_id: number, code:string):Promise<Date>{
        const [temp] = await this.calenderRepository.find({
            select: {createdAt: true},
            where: {pot_id:pot_id, code:code},
            order: {createdAt: 'DESC'},
            take: 1
        })
        if (temp == null) return ("9999-99-99" as unknown as Date)
        return temp.createdAt;
    }
}
