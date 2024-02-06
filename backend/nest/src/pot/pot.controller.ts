import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { CollectionDto, CreatePotDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('pot')
@ApiTags('Pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    @ApiOperation({summary: '모든 화분(식물) 상세 조회'})
    @ApiOkResponse({type: SelectPotDto})
    async findAllPot(): Promise<SelectPotDto[]>{
        return await this.potService.findAllPot();
    }

    @Get(':pot_id')
    @ApiOperation({ summary: "화분(식물) 상세 조회"})
    @ApiOkResponse({ type:Pot, description:'선택한 화분(컬렉션에 있는 화분 포함)의 모든 정보 조회' })
    async potDetail(@Param('pot_id') pot_id: number): Promise<Pot>{
        return await this.potService.potDetail(pot_id);
    }

    @Post()
    @ApiBody({type: CreatePotDto})
    @ApiOperation({ summary: '화분 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async save( @Body() createPotDto: CreatePotDto): Promise<number>{
        this.potService.save(createPotDto);
        return 1;
    }

    @Put(':pot_id')
    @ApiBody( { type: UpdatePotDto } )
    @ApiOperation({ summary: '화분 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async update( @Param('pot_id') user_id: number, @Body() pot: UpdatePotDto): Promise<number>{
        await this.potService.update(user_id, pot);
        return 1 
    }

    @Delete(':pot_id')
    @ApiOperation({ summary: '화분 삭제'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async delete(@Param('pot_id') pot_id: number): Promise<number>{
        await this.potService.delete(pot_id);
        return 1;
    }

    @Get('user/:user_id')
    @ApiOperation({summary: '해당 유저의 모든 화분 조회'})
    @ApiOkResponse({ type: Pot, description:'유저의 컬렉션 정보 조회' })
    async findPotByUserId(@Param('user_id') user_id: number): Promise<Pot[]>{
        return await this.potService.findPotsByUserId(user_id);
    }

    @Get('collection/:user_id')
    @ApiOperation({summary: '해당 유저의 모든 컬렉션 조회'})
    @ApiOkResponse({ type: CollectionDto, description:'유저의 컬렉션 정보 조회' })
    async getCollection(@Param('user_id') user_id: number): Promise<CollectionDto[]>{
        return await this.potService.findCollection(user_id);
    }


    @Put('collection/:pot_id')
    @ApiOperation({summary: '성장완료 되서 컬렉션으로 이동'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    async toCollection(@Param('pot_id') pot_id: number): Promise<number>{
        await this.potService.delete(pot_id);
        await this.potService.toCollection(pot_id);
        return 1;
    }
}
