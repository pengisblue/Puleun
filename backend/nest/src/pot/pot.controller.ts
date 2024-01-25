import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { CreatePotDto, UpdatePotDto } from './pot.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('pot')
@ApiTags('Pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    @ApiOperation({ summary: '화분(식물) 전체 조회'})
    @ApiOkResponse({ type:Pot, description:'현재 존재하는 모든 화분 조회' })
    async findAll(): Promise<Pot[]>{
        return this.potService.findAll();
    }

    @Post()
    @ApiOperation({ summary: '화분 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async save(@Body() potDto: CreatePotDto): Promise<number>{
        this.potService.save(potDto);
        return 1;
    }

    @Put(':pot_id')
    @ApiOperation({ summary: '화분 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async update(@Param('pot_id') user_id: number, @Body() pot: UpdatePotDto): Promise<number>{
        await this.potService.update(user_id, pot);
        return 1 
    }

    @Delete(':pot_id')
    @ApiOperation({ summary: '화분 삭제'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async delete(@Param('pot_id') user_id: number): Promise<number>{
        await this.potService.delete(user_id);
        return 1;
    }
}
