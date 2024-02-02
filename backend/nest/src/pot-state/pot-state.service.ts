import { Injectable } from '@nestjs/common';
import { PotState } from './pot-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePotStateDto } from './pot-state-insert.dto';
import { PotService } from 'src/pot/pot.service';
import { StatusResultDto } from './pot-state.dto';
import { CalenderService } from 'src/calender/calender.service';

@Injectable()
export class PotStateService {
  constructor(
    @InjectRepository(PotState)
    private readonly potStateRepository: Repository<PotState>,
    private readonly potService: PotService,
    private readonly calenderService: CalenderService
  ){}

  async findByPotId(pot_id: number, isTemp_FG: boolean): Promise<PotState[]>{
    return this.potStateRepository.findBy({pot_id, isTemp_FG})
  }

  /** 온도,습도 Insert */
  async save(inputDto: CreatePotStateDto): Promise<number>{
    if (inputDto.pot_id == null) {
      console.log("find pot_id")
      return -1;
    }
    this.potStateRepository.save(inputDto)
    
    return 1
  }

  
  async checkStatus(parent_id: number): Promise<PotState[]>{
      const dto = new StatusResultDto();
      const potList = await this.potService.findPotsByUserId(parent_id);
      
      for (let index = 0; index < potList.length; index++) {
        const element = potList[index];
        const tempAndMois = await this.getMoisAndTemp(element.pot_id);
        const lastWaterDay = await this.calenderService.getLastWaterDay(element.pot_id);

        dto.pot_id = element.pot_id;
        dto.pot_species = element.pot_species;
        dto.pot_img_url = element.pot_img_url;
        dto.current_mois = tempAndMois.current_mois[0]?.data;
        dto.current_temp = tempAndMois.current_temp[0]?.data;
        dto.last_water = lastWaterDay;
        dto.planting_day = element.createdAt;
        
      }

      
      return null;
  }

  async getMoisAndTemp(pot_state_id: number): Promise<any>{
    const current_temp = await this.potStateRepository.findOne({
      where:{pot_state_id: pot_state_id, isTemp_FG: true},
      order:{measure_DT: 'DESC'},
      select: {data: true}
    })

    const current_mois = await this.potStateRepository.findOne({
      where:{pot_state_id: pot_state_id, isTemp_FG: false},
      order:{measure_DT: 'DESC'},
      select: {data: true}
    })

    return {
      current_temp: current_temp,
      current_mois: current_mois
    };
  }



}
