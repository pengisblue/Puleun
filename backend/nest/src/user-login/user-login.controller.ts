import { Body, Controller, Delete, Get, Inject, Param, Post, Put, forwardRef } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserLogin } from './user-login.entity';
import { AllUserDto, LoginDto, UserLoginSaveDto } from './user-login.dto';
import { UserService } from 'src/user/user.service';

@Controller('user-login')
@ApiTags('user-login')
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService,
                @Inject(forwardRef(() => UserService))
                private readonly userService: UserService){}

    @Post('/save')
    @ApiOperation({summary:'유저 저장'})
    @ApiProperty({type: UserLoginSaveDto})
    async userSave(@Body() userLogin: UserLogin){
        await this.userLoginService.save(userLogin);
        return 1;
    }

    @Put(':user_id')
    @ApiOperation({summary:'이름 & 이메일 & 비밀번호 수정'})
    @ApiProperty({type: UserLoginSaveDto})
    async userUpdate(@Param('user_id') user_id: number, userLoginDto: UserLoginSaveDto): Promise<number>{
        return await this.userLoginService.update(user_id, userLoginDto);
    }

    @Post()
    @ApiOperation({summary: '로그인'})
    @ApiProperty({type: LoginDto})
    async login(@Body() loginDto: LoginDto): Promise<number>{
        if(await this.userLoginService.login(loginDto)) return 1;
        else return 0;
    }

    @Get(':user_id')
    @ApiOperation({summary: '자기 정보 조회'})
    async myInfo(@Param('user_id') user_id: number): Promise<UserLoginSaveDto>{
        return await this.userLoginService.myInfo(user_id);
    }

    @Get()
    @ApiOperation({summary: '모든 유저 정보 조회'})
    async allUserInfo(): Promise<AllUserDto[]>{
        return await this.userService.findUserWithInfo();
    }
}
