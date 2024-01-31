import { Controller, Get } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { Calender } from './calender.entity';
import { SelectCalenderDto } from './calender.dto';

@Controller('calender')
export class CalenderController {
    constructor(private readonly calenderService: CalenderService){}

    @Get()
    async findAll(): Promise<SelectCalenderDto[]>{
        return await this.calenderService.findAll();
    }
}
