import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cats } from './cats.entity';
import { Repository } from 'typeorm';


@Injectable() // 해당 decorator 달린 클래스는 provider다
export class CatsService {
    constructor(
        @Inject("CATS_REPOSITORY")
        private readonly CatsRepository: Repository<Cats>
    ){}

    async findAll(): Promise<Cats[]>{
        return this.CatsRepository.find();
    }

}
