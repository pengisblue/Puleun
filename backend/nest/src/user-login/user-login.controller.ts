import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLogin } from './user-login.entity';

@Controller('user-login')
@ApiTags('user-login')
export class UserLoginController {
    constructor(private readonly userLoginService: UserLoginService){}

    @Post()
    @ApiOperation({summary:'유저 저장'})
    async userSave(@Body() userLogin: UserLogin){
        return await this.userLoginService.save(userLogin);
    }

    @Delete(':user_id')
    @ApiOperation({summary:'유저 삭제'})
    async userDelete(@Param('user_id') user_id: number): Promise<number>{
        return await this.userLoginService.delete(user_id);
    }
}
