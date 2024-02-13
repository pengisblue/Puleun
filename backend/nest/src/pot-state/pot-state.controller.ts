import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PotStateService } from './pot-state.service';
import { PotState } from './pot-state.entity';
import { MoisAndTemp, StatusResultDto } from './pot-state.dto';

@Controller('pot-state')
@ApiTags('pot-state')
export class PotStateController {
    constructor(private readonly potStateService: PotStateService){};

    @Get('/:pot_id&:isTemp')    
    async findById(@Param('pot_id') pot_id:number, @Param('isTemp') isTemp:boolean): Promise<PotState[]>{
        return this.potStateService.findByPotId(pot_id, isTemp)
    }
    
    @Get(':parent_id')
    @ApiOperation({summary: '부모가 가진 화분과 상태 표현'})
    @ApiOkResponse({type:StatusResultDto})
    async checkStatus(@Param('parent_id') parent_id: number): Promise<StatusResultDto[]>{
        const result = await this.potStateService.checkStatus(parent_id);
        return result;
    }
    
    @Get('yesterday/:pot_id')
    @ApiOperation({summary: '화분의 전날 온습도 리스트'})
    @ApiOkResponse({type: MoisAndTemp})
    async getYesterday(@Param('pot_id') pot_id: number): Promise<MoisAndTemp>{
        return await this.potStateService.yesterdayMoisAndTemp(pot_id);
    }

    @Get('today/:pot_id')
    @ApiOperation({summary: '화분의 오늘 온습도 리스트'})
    @ApiOkResponse({type: MoisAndTemp})
    async getToday(@Param('pot_id') pot_id: number): Promise<MoisAndTemp>{
        return await this.potStateService.yesterdayMoisAndTemp(pot_id);
    }
    
}
