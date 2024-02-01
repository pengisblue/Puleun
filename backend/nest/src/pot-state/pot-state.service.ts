import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PotState } from './pot-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePotStateDto } from './pot-state-insert.dto';

@Injectable()
export class PotStateService {
  constructor(
    @InjectRepository(PotState)
    private readonly potStateRepository: Repository<PotState>,
  ){}

  async findByPotId(pot_id: number, isTemp_FG: boolean): Promise<PotState[]>{
    return this.potStateRepository.findBy({pot_id, isTemp_FG})
  }

  /** 온도,습도 Insert */
  async save(inputDto: CreatePotStateDto): Promise<number>{
    this.potStateRepository.save(inputDto)
    return 1
  }
}
