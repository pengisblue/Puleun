import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { Repository } from 'typeorm';
import { LoginDto, UserLoginSaveDto } from './user-login.dto';
import { plainToInstance } from 'class-transformer';
import { UserWithUserLoginDto } from 'src/user/user-req.dto';
import { LoginUserDto } from './user-login.req.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserLoginService {
    constructor(
        @InjectRepository(UserLogin) 
        private readonly userLoginRepository: Repository<UserLogin>,
        private readonly userService:UserService){}

    /** 로그인 시 유저 저장하고 로그인 정보 저장 */
    async save(userLogin: LoginUserDto, file?: Express.Multer.File): Promise<string>{
        const {user, login} = userLogin
        const user_id = await this.userService.save(user, file)
        if (!user_id) return 'FAIL'
        login.user_id = user_id
        await this.userLoginRepository.save(userLogin)
        return "SUCCESS"
    }

    async update(user_id: number, userLoginDto: UserLoginSaveDto): Promise<number>{
        await this.userLoginRepository.update(user_id, {...userLoginDto});
        return 1;
    }

    async login(loginDto: LoginDto): Promise<boolean>{
        const dto = await this.userLoginRepository.findOne({
            where: {user_email: loginDto.user_email, user_password: loginDto.user_password},       
        })
        if(dto == null) return false;
        return true;
    }

    async myInfo(user_id: number): Promise<UserLoginSaveDto>{
        const dto = await this.userLoginRepository.findOne({where: {user_id}});
        return plainToInstance(UserLoginSaveDto, dto);
    }

    async create(data: UserWithUserLoginDto): Promise<UserLogin>{
        return await this.userLoginRepository.create(data);
    }
}
