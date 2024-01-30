import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user-res.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraModels } from "@nestjs/swagger";
import { UserListDto } from './user-req.dto';

@Controller('user')
@ApiTags('User')
@ApiExtraModels(UserListDto, CreateUserDto, UpdateUserDto)
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('child/:user_id')
    @ApiOperation({ summary: '아이 전체 조회'})
    @ApiOkResponse({ type:UserListDto, description: 'user_id를 부모로하는 아이들 조회' })
    async findAll(@Param('user_id') user_id:number):Promise<UserListDto[]>{
        return this.userService.findByParent(user_id)
    }
    
    @Get(':user_id')
    @ApiOperation({ summary: 'user_id로 유저 조회' })
    @ApiOkResponse({ type:User, description:'유저 상세 조회' })
    async find(@Param('user_id') user_id:number):Promise<User>{
        return this.userService.find(user_id)
    }

    @Post()
    @ApiOperation({ summary: '유저 등록 & 아이 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    @ApiNotFoundResponse({ description:'wrong data request' })
    async save(@Query() @Body() child:CreateUserDto): Promise<number>{
        return this.userService.save(child)
    }

    @Put(':user_id')
    @ApiOperation({ summary: '유저 & 아이 정보 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS'})
    async update(@Query() @Param('user_id') user_id:number, @Query() @Body() child:UpdateUserDto): Promise<number>{
        return this.userService.update(user_id, child)
    }
    
    @Delete(':user_id')
    @ApiOperation({ summary: '유저 정보 삭제'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS'})
    async delete(@Param('user_id') user_id:number): Promise<number>{
        return this.userService.delete(user_id)
    }
}
