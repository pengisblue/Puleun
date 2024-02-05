import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserLogin } from './user-login.entity';
import { LoginDto, UserLoginDto } from './user-login.dto';

@Controller('user-login')
@ApiTags('user-login')
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService){}

    @Post('/save')
    @ApiOperation({summary:'유저 저장'})
    @ApiProperty({type: UserLogin})
    async userSave(@Body() userLogin: UserLogin){
        return await this.userLoginService.save(userLogin);
    }

    @Put(':user_id')
    @ApiOperation({summary:'이름 & 이메일 & 비밀번호 수정'})
    @ApiProperty({type: UserLoginDto})
    async userUpdate(@Param('user_id') user_id: number, userLoginDto: UserLoginDto): Promise<number>{
        return await this.userLoginService.update(user_id, userLoginDto);
    }

    @Post()
    @ApiOperation({summary: '로그인'})
    @ApiProperty({type: LoginDto})
    async login(@Body() loginDto: LoginDto): Promise<UserLoginDto>{
        return await this.userLoginService.login(loginDto);
    }

    @Get(':user_id')
    @ApiOperation({summary: '자기 정보 조회'})
    async myInfo(@Param('user_id') user_id: number): Promise<UserLoginDto>{
        return await this.userLoginService.myInfo(user_id);
    }
}
