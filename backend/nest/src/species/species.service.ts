import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
    constructor(@InjectRepository(Species) private readonly speciesRepository: Repository<Species>){}
    
    async speciesFind(): Promise<Species[]>{
        return await this.speciesRepository.find();
    }
}
