import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PotStateService } from './pot-state.service';
import { PotState } from './pot-state.entity';
import { CreatePotStateDto } from './pot-state-insert.dto';
import { StatusResultDto } from './pot-state.dto';

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

    @Get(':parent_id')
    @ApiOperation({summary: '부모가 가진 화분과 상태 표현'})
    async checkStatus(@Param('parent_id') parent_id: number): Promise<StatusResultDto[]>{
        const result = await this.potStateService.checkStatus(parent_id);
        return result;
    }
}
