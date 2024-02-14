import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PotState } from './pot-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePotStateDto } from './pot-state-insert.dto';
import { PotService } from 'src/pot/pot.service';
import { DataDto, MoisAndTemp, StatusResultDto } from './pot-state.dto';
import { CalenderService } from 'src/calender/calender.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PotStateService {
  constructor(
    @InjectRepository(PotState)
    private readonly potStateRepository: Repository<PotState>,
    @Inject(forwardRef(() => PotService))
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
    
      for (let index = 0; index < potList.length; index++) {
        const element = potList[index];
        const lastWaterDay = await this.calenderService.getLastDay(element.pot_id, "W");
        const together_day = this.theDayWeWereTogether(element.createdAt);
        const moisState = this.moisState(element.min_moisture, element.max_moisture, element.moisture);
        const tempState = this.tempState(element.min_temperature, element.max_temperature, element.temperature);

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

        console.log(dto);
        dtos.push(dto);
      }
      // console.log(dtos);
      return dtos;
  }

  // 전날 온습도 데이터
  async yesterdayMoisAndTemp(pot_id: number): Promise<MoisAndTemp>{
    const moisAndTemp = new MoisAndTemp();
    const today = new Date();
    const yesterdayStart = new Date(today);
    yesterdayStart.setDate(today.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(today);
    yesterdayEnd.setDate(today.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);
    const yester_temp = plainToInstance(DataDto, await this.potStateRepository.find({
      where:{
        pot_id: pot_id, isTemp_FG: true, measure_DT: Between(
          yesterdayStart, yesterdayEnd
        )},
      order:{measure_DT: 'DESC'},
      select: {data: true, measure_DT: true}
    }), {excludeExtraneousValues: true});

    const yester_mois = plainToInstance(DataDto ,await this.potStateRepository.find({
      where:{
        pot_id: pot_id, isTemp_FG: false, measure_DT: Between(
          yesterdayStart, yesterdayEnd
        )},
      order:{measure_DT: 'DESC'},
      select: {data: true, measure_DT:true}
    }), {excludeExtraneousValues: true})

    moisAndTemp.temperature = yester_temp;
    moisAndTemp.moisture = yester_mois;
    
    return moisAndTemp;
  }

  // 오늘 온습도 데이터
  async todayMoisAndTemp(pot_id: number): Promise<MoisAndTemp>{
    const moisAndTemp = new MoisAndTemp();
    const today = new Date();
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(today);
    const yester_temp = plainToInstance(DataDto, await this.potStateRepository.find({
      where:{
        pot_id: pot_id, isTemp_FG: true, measure_DT: Between(
          todayStart, todayEnd
        )},
      order:{measure_DT: 'DESC'},
      select: {data: true, measure_DT: true}
    }), {excludeExtraneousValues: true});

    const yester_mois = plainToInstance(DataDto ,await this.potStateRepository.find({
      where:{
        pot_id: pot_id, isTemp_FG: false, measure_DT: Between(
          todayStart, todayEnd
        )},
      order:{measure_DT: 'DESC'},
      select: {data: true, measure_DT:true}
    }), {excludeExtraneousValues: true})

    moisAndTemp.temperature = yester_temp;
    moisAndTemp.moisture = yester_mois;
    
    return moisAndTemp;
  }

  // 현재 시간과 식물을 심은날을 day로 계산
  theDayWeWereTogether(startDay: Date): number{
    const now = new Date();
    return Math.floor((now.getTime() - startDay.getTime())/ (1000 * 60 * 60 * 24));
  }

  // 온도에 따른 상태 표시
  tempState(min: number, max: number, current: number): string{
    if(current < min) return '낮음';
    else if (min <= current && max >= current) '적정';
    return '높음';
  }

  // 습도에 따른 상태 표시
  moisState(min: number, max: number, current: number): string{
    if(current < min) return '부족';
    else if (min <= current && max >= current) '적정';
    return '초과';
  }

  // 어제와 오늘의 온습도 출력
  // async getCompareData(pot_id: number): Promise<CompareDataDto>{
  //   const dto = new CompareDataDto();

  //   const yesterdayData = await this.yesterdayMoisAndTemp(pot_id);
  //   // const currentData = await this.potService.calenderWithCurrentMoisAndTemp(pot_id);

  //   dto.yesterday_mois = yesterdayData.yesterDayMoisAverage;
  //   dto.yesterday_temp = yesterdayData.yesterDayTempAverage;
  //   dto.current_mois = currentData.moisture;
  //   dto.current_temp = currentData.temperature;
    
  //   return dto;
  // }

}
