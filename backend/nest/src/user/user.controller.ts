import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateChildDto } from './createChilid.dto';
import { UpdateUserDto } from './updateUser.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @ApiOperation({ summary: '유저 전체 조회'})
    @ApiOkResponse({type:User, description: '전체 유저 조회'})
    async findAll():Promise<User[]>{
        return this.userService.findAll()
    }
    
    @Get(':user_id')
    @ApiOperation({ summary: 'user_id로 유저 조회'})
    @ApiOkResponse({type:User, description:'유저 Read'})
    async find(@Param('user_id') user_id:number):Promise<User>{
        return this.userService.find(user_id)
    }

    @Post()
    async save(@Body() child:CreateChildDto): Promise<number>{
        return this.userService.save(child)
    }

    @Put(':user_id')
    async update(@Param('user_id') user_id:number, @Body() child:UpdateUserDto): Promise<number>{
        return this.userService.update(user_id, child)
    }
    
    @Delete(':user_id')
    async delete(@Param('user_id') user_id:number): Promise<number>{
        return this.userService.delete(user_id)
    }
}
