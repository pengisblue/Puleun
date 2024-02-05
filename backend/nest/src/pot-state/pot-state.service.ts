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

  
  async checkStatus(parent_id: number): Promise<StatusResultDto[]>{
      const dtos: StatusResultDto[] = new Array<StatusResultDto>();

      const dto = new StatusResultDto();
      const potList = await this.potService.findPotsByUserId(parent_id);
      console.log(potList);
    
      for (let index = 0; index < potList.length; index++) {
        const element = potList[index];
        const tempAndMois = await this.getMoisAndTemp(element.pot_id);
        const lastWaterDay = await this.calenderService.getLastWaterDay(element.pot_id);
        const together_day = this.theDayWeWereTogether(element.createdAt);
        const moisState = this.moisState(element.min_moisture, element.max_moisture, tempAndMois.current_mois[0]?.data);
        const tempState = this.tempState(element.min_temperature, element.max_temperature, tempAndMois.current_temp[0]?.data);
        
        dto.pot_id = element.pot_id;
        dto.pot_species = element.pot_species;
        dto.pot_img_url = element.pot_img_url;
        dto.current_mois = element.moisture;
        dto.current_temp = element.temperature;
        dto.last_water = lastWaterDay;
        dto.planting_day = element.createdAt;
        dto.together_day = together_day;
        dto.temp_state = tempState;
        dto.mois_state = moisState;
        dtos.push(dto);
      }
      // console.log(dtos);
      return dtos;
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
    
    const tempValue = current_temp ? current_temp.data : 0;
    const moisValue = current_mois ? current_mois.data : 0;
    
    return {
      current_temp: tempValue,
      current_mois: moisValue
    };
  }


  // 현재 시간과 식물을 심은날을 day로 계산
  theDayWeWereTogether(startDay: Date): number{
    const now = new Date();
    return Math.floor((now.getTime() - startDay.getTime())/ (1000 * 60 * 60 * 24));
    // const daysDifference = (dateObject1 - dateObject2) / (1000 * 60 * 60 * 24);
  }

  // 
  tempState(min: number, max: number, current: number): string{
    if(current < min) return '부족';
    else if (min <= current && max >= current) '적정';
    return '초과';
  }

  moisState(min: number, max: number, current: number): string{
    if(current < min) return '부족';
    else if (min <= current && max >= current) '적정';
    return '초과';
  }

}
