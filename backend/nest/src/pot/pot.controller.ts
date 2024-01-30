import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { CollectionDto, CreatePotDto, UpdatePotDto } from './pot.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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

    @Get(':pot_id')
    @ApiOperation({ summary: "화분(식물) 상세 조회"})
    @ApiOkResponse({ type:Pot, description:'선택한 화분의 모든 정보 조회' })
    async potDetail(@Param('pot_id') pot_id: number): Promise<Pot>{
        return this.potService.potDetail(pot_id);
    }

    @Post()
    @ApiOperation({ summary: '화분 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    @ApiBody({type: CreatePotDto, description: 'pot_name, pot_species, pot_img_url만 입력해도 됌'})
    async save(@Body() pot: Pot): Promise<number>{
        this.potService.save(pot);
        return 1;
    }

    @Put(':pot_id')
    @ApiOperation({ summary: '화분 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    @ApiBody({type: UpdatePotDto})
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

    // @Get('collections/:user_id')
    // @ApiOperation({ summary: '컬렉션 조회'})
    // @ApiOkResponse({ type:CollectionDto, description:'유저의 컬렉션 정보 조회' })
    // @ApiBody({type: CollectionDto})
    // async findCollection(@Param('user_id') user_id: number): Promise<CollectionDto[]>{
    //     return await this.potService.findCollection(user_id);
    // }

    // @Get('collection/:user_id/:pot_id')
    // @ApiOperation({ summary: '컬렉션 조회'})
    // @ApiOkResponse({ type:CollectionDto, description:'유저의 컬렉션 정보 조회' })
    // @ApiBody({type: CollectionDto})
    // async collectionDetail(@Param('user_id') user_id: number, @Param('pot_id') pot_id: number): Promise<CollectionDto>{
    //     return await this.potService.collectionDetail(user_id, pot_id);
    // }
}
