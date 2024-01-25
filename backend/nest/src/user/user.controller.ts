import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateChildDto , UpdateUserDto } from './user.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('child/:user_id')
    @ApiOperation({ summary: '아이 전체 조회'})
    @ApiOkResponse({type:User, description: 'user_id를 부모로하는 아이들 조회'})
    @ApiNotFoundResponse({ description: '아이가 없는 경우' })
    async findAll(@Param('user_id') user_id:number):Promise<User[]>{
        return this.userService.findByParent(user_id)
    }
    
    @Get(':user_id')
    @ApiOperation({ summary: 'user_id로 유저 조회' })
    @ApiOkResponse({ type:User, description:'유저 Read' })
    async find(@Param('user_id') user_id:number):Promise<User>{
        return this.userService.find(user_id)
    }

    @Post()
    @ApiOperation({ summary: '유저 등록 및 아이 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    @ApiNotFoundResponse({ description:'check User Data' })
    async save(@Body() child:CreateChildDto): Promise<number>{
        return this.userService.save(child)
    }

    @Put(':user_id')
    @ApiOperation({ summary: '아이 정보 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS'})
    async update(@Param('user_id') user_id:number, @Body() child:UpdateUserDto): Promise<number>{
        return this.userService.update(user_id, child)
    }
    
    @Delete(':user_id')
    async delete(@Param('user_id') user_id:number): Promise<number>{
        return this.userService.delete(user_id)
    }
}
