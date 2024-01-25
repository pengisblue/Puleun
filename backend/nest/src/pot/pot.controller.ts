import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { CreatePotDto, UpdatePotDto } from './pot.dto';

@Controller('pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    async findAll(): Promise<Pot[]>{
        return this.potService.findAll();
    }

    @Post()
    async createPot(@Body() potDto: CreatePotDto): Promise<number>{
        this.potService.createPot(potDto);
        return 1;
    }

    @Put(':pot_id')
    async update(@Param('pot_id') user_id: number, @Body() pot: UpdatePotDto): Promise<number>{
        await this.potService.update(user_id, pot);
        return 1 
    }

    @Delete(':pot_id')
    async delete(@Param('pot_id') user_id: number): Promise<number>{
        await this.potService.delete(user_id);
        return 1;
    }
}
