import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user-req.dto';
import { UserDetailDto, UserListDto } from './user-res.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>
    ){}

    async findByParent(user_id: number):Promise<UserListDto[]>{
        const child = await this.UserRepository.findBy({parent_id:user_id})
        return child;
    }

    async find(user_id: number): Promise<UserDetailDto>{
        const user = await this.UserRepository.findOneBy({user_id})
        
        if (!user) throw new HttpException('Check User_Id', HttpStatus.BAD_REQUEST)
        
        return user;
    }

    async save(data: CreateUserDto): Promise<number>{
        const user = this.UserRepository.create(data)
        try{
            if (user.parent_id == null || user.parent_id == 0) user.parent_id = null // parent_id==null인 경우 사용자 본인
            await this.UserRepository.save(user)
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }

    async update(user_id: number, data: UpdateUserDto): Promise<number>{
        const user = await this.UserRepository.findOneBy({
            user_id
        })

        if (!user) throw new HttpException('Bad_REQUEST', HttpStatus.NOT_FOUND)
        try{
            this.UserRepository.update(user_id, {...data})
            return 1;
        }catch (e){
            return -1;
        }
    }

    async delete(user_id: number): Promise<number>{
        try {
            await this.UserRepository.delete(user_id)
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }
}
