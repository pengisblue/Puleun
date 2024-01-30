import { Controller, Get } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { Calender } from './calender.entity';

@Controller('calender')
export class CalenderController {
    constructor(private readonly calenderService: CalenderService){}

    @Get()
    async findAll(): Promise<Calender[]>{
        return await this.calenderService.findAll();
    }
}
