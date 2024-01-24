import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChildDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>
    ){}

    async findAll():Promise<User[]>{
        return this.UserRepository.find()
    }

    async find(user_id: number): Promise<User>{
        const user = await this.UserRepository.findOneBy({user_id})

        if (!user) throw new HttpException('Check User_Id', HttpStatus.BAD_REQUEST)
        
        return user;
    }

    async save(data: CreateChildDto): Promise<number>{
        const user = this.UserRepository.create(data)
        try{
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
