import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { Repository } from 'typeorm';
import { CalenderCreateDto } from './calender-req.dto';
import { FileService } from './../file/file.service';
import { SelectCalenderDto, SimpleCalenderDto } from './calender.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CalenderService {
    constructor(
        @InjectRepository(Calender) 
        private readonly calenderRepository: Repository<Calender>,
        private readonly fileService:FileService,
    ){}
    
    /** 식물의 캘린더 찾기 */
    async findCalenderByPotId(pot_id: number): Promise<SimpleCalenderDto[]>{
        return plainToInstance(SimpleCalenderDto, await this.calenderRepository.find({where:{pot_id}}), {excludeExtraneousValues: true});
    }

    /** save "W" day or "T" day*/
    async save(calenderCreateDto: CalenderCreateDto): Promise<string>{
        const res = await this.getLastDay(calenderCreateDto.pot_id, calenderCreateDto.code)
        const today: Date = new Date(this.fileService.getToday())
        if (res == null || (res.getFullYear() == today.getFullYear()
                && res.getMonth() == today.getMonth()
                && res.getDate() == today.getDate())) await this.calenderRepository.save(calenderCreateDto)
        return "success";
    }

    async findAllCalender(): Promise<SimpleCalenderDto[]>{
        return plainToInstance(SimpleCalenderDto, await this.calenderRepository.find(), {excludeExtraneousValues: true});
    }

    async getLastDay(pot_id: number, code:string):Promise<Date>{
        const [temp] = await this.calenderRepository.find({
            select: {createdAt: true},
            where: {pot_id:pot_id, code:code},
            order: {createdAt: 'DESC'},
            take: 1
        })
        if (temp == null) return (null)
        return temp.createdAt;
    }

    async whenPotSave(pot_id: number){
        await this.calenderRepository.save({pot_id, code: 'T'});
        await this.calenderRepository.save({pot_id, code: 'W'});
    }
}
