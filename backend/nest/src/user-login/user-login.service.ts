import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserLoginService {
    constructor(@InjectRepository(UserLogin) 
    private readonly userLoginRepository: Repository<UserLogin>){}

    async save(userLogin: UserLogin){
        return await this.userLoginRepository.save(userLogin);
    }

    async delete(user_id: number): Promise<number>{
        await this.userLoginRepository.delete(user_id);
        return 1
    }

}
