import { Get, Controller, Post, Body, Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @Inject("User_REPOSITORY")
        private readonly UserRepository: Repository<User>
    ){}

    async findUser():Promise<User[]>{
        return this.UserRepository.find()
    }
}
