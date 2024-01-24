import { Body, Controller, Get, Post } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { PotDto } from './pot.dto';

@Controller('pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    async findAll(): Promise<Pot[]> {
        return this.potService.findAll();
    }

    @Post()
    async createPot(@Body() potDto: PotDto){
        this.potService.createPot(potDto);
    }

}
