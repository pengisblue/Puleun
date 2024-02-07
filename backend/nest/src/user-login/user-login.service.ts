import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { Repository } from 'typeorm';
import { AllUserDto, LoginDto, UserLoginDto } from './user-login.dto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class UserLoginService {
    constructor(@InjectRepository(UserLogin) 
    private readonly userLoginRepository: Repository<UserLogin>){}

    async save(userLogin: UserLogin){
        return await this.userLoginRepository.save(userLogin);
    }

    async update(user_id: number, userLoginDto: UserLoginDto): Promise<number>{
        await this.userLoginRepository.update(user_id, userLoginDto);
        return 1;
    }

    async login(loginDto: LoginDto): Promise<boolean>{
        const dto = await this.userLoginRepository.findOne({
            where: {user_email: loginDto.user_email, user_password: loginDto.user_password},       
        })
        if(dto == null) return false;
        return true;
    }

    async myInfo(user_id: number): Promise<UserLoginDto>{
        const dto = await this.userLoginRepository.findOne({where: {user_id}});
        return plainToInstance(UserLoginDto, dto);
    }
}
