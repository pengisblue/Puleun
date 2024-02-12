import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors, forwardRef } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiBody, ApiExtraModels, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AllUserDto, LoginDto, UserLoginSaveDto } from './user-login.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './user-login.req.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user-login')
@ApiTags('user-login')
@ApiExtraModels(LoginUserDto)
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService,
                @Inject(forwardRef(() => UserService))
                private readonly userService: UserService){}

    @Post('/save')
    @ApiOperation({summary:'유저 저장'})
    @ApiBody({type: LoginUserDto})
    @UseInterceptors(FileInterceptor('profile_img'))
    async userSave(@Body() userLogin: LoginUserDto,
    @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .build({
                fileIsRequired: false,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            })
    ) file?: Express.Multer.File){
        await this.userLoginService.save(userLogin, file);
        return 1;
    }

    @Put(':user_id')
    @ApiOperation({summary:'이름 & 이메일 & 비밀번호 수정'})
    @ApiBody({type: UserLoginSaveDto})
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
