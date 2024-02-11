import { Body, Controller, Delete, Get, Inject, Param, Post, Put, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserWithUserLoginDto } from './user-req.dto';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraModels } from "@nestjs/swagger";
import { UserDetailDto, UserListDto } from './user-res.dto';
import { User } from './user.entity';
import { UserLoginService } from 'src/user-login/user-login.service';

@Controller('user')
@ApiTags('User')
@ApiExtraModels(UserListDto, CreateUserDto, UpdateUserDto)
export class UserController {
    constructor(private readonly userService: UserService,
                @Inject(forwardRef(() => UserLoginService))
                private readonly userLoginService: UserLoginService){}

    @Get()
    @ApiOperation({summary: '모든 유저 조회'})
    async findAllUser(): Promise<User[]>{
        return await this.userService.findAllUser();
    }

    @Get('child/:user_id')
    @ApiOperation({ summary: '아이 전체 조회'})
    @ApiOkResponse({ type:UserListDto, description: 'user_id를 부모로하는 아이들 조회' })
    async findAll(@Param('user_id') user_id:number):Promise<UserListDto[]>{
        return this.userService.findByParent(user_id)
    }
    
    @Get(':user_id')
    @ApiOperation({ summary: '유저 상세 조회' })
    @ApiOkResponse({ type:UserDetailDto, description:'유저 상세 조회' })
    async find(@Param('user_id') user_id:number):Promise<UserDetailDto>{
        return this.userService.find(user_id)
    }

    @Post()
    @ApiBody( { type: UserWithUserLoginDto } )
    @ApiOperation({ summary: '유저 등록 & 아이 등록'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS' })
    @ApiNotFoundResponse({ description:'wrong data request' })
    async save(@Body() user:UserWithUserLoginDto): Promise<string>{
        await this.userService.save(user)
        return 'SUCCESS';
    }

    @Put(':user_id')
    @ApiBody( { type: UpdateUserDto } )
    @ApiOperation({ summary: '유저 & 아이 정보 수정'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS'})
    async update(@Param('user_id') user_id:number, @Body('user') user:UpdateUserDto): Promise<number>{
        return this.userService.update(user_id, user)
    }
    
    @Delete(':user_id')
    @ApiOperation({ summary: '유저 정보 삭제'})
    @ApiOkResponse({ type:'1', description:'1 for SUCCESS'})
    async delete(@Param('user_id') user_id:number): Promise<number>{
        return this.userService.delete(user_id)
    }

    @Get('create/:user_id')
    @ApiOperation({summary: '부모가 화분 등록시 화분 매핑이 되어있지 않는 아이 출력'})
    async unMappingUser(@Param('user_id') user_id: number): Promise<UserListDto[]>{
        return await this.userService.unMappingUser(user_id);
    }   

    @Get('byParent/:parent_id')
    @ApiOperation({summary: '부모의 아이에 대한 간단 출력'})
    async simpleUserList(@Param('parent_id') parent_id: number){
        return await this.userService.simpleUserList(parent_id);
    }
}
