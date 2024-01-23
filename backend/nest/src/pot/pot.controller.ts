import { Controller, Get } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';

@Controller('pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    async findAll(): Promise<Pot[]> {
        return this.potService.findAll();
    }

}
