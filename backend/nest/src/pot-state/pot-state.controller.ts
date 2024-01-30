import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PotStateService } from './pot-state.service';
import { PotState } from './pot-state.entity';
import { CreatePotStateDto } from './pot-state-insert.dto';

@Controller('pot-state')
@ApiTags('pot-state')
export class PotStateController {
    constructor(private readonly potStateService: PotStateService){};

    @Get('/:pot_id/:isTemp')
    async findById(@Param('pot_id') pot_id:number, @Param('isTemp') isTemp:boolean): Promise<PotState[]>{
        return this.potStateService.findByPotId(pot_id, isTemp)
    }

    @Post()
    async save(@Body() createPotStateDto:CreatePotStateDto): Promise<number>{
        return this.potStateService.save(createPotStateDto)
    }
}
