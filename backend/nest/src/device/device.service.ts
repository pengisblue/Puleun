import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { DeviceCreateDto, PotInitDeviceDto, SelectDeviceDto, UserInitDeviceDto } from './device-req.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ){}

  async findBySerialNumber(serial_number: string): Promise<Device>{
    const [res] = await this.deviceRepository.find({where:{serial_number}, take:1})
    return res
  }
  
  async save(device: DeviceCreateDto): Promise<number>{
    this.deviceRepository.save(device)
    return 1;
  }

  /** 유저의 디바이스 중 매핑된 유저와 식물이 없는 디바이스 출력 */
  async emptyDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, empty_FG: false, pot_id: IsNull() },
      select: {device_id: true, serial_number: true}
    })
  }

  async unEmptyDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, empty_FG: true, pot_id: Not(IsNull())},
      select: {device_id: true, serial_number: true}
    })
  }

  async connectDevice(serial_number: string, client_id: string): Promise<string>{
    const [res] = await this.deviceRepository.find({where:{serial_number}, take:1})
    res.client_id = client_id
    await this.deviceRepository.update(res.device_id, res)
    return "success"
  }

  async disconnectDevice(client_id: string): Promise<string>{
    const [res] = await this.deviceRepository.find({where:{client_id}, take:1})
    res.client_id = null
    await this.deviceRepository.update(res.device_id, res)
    return "success"
  }

  /** 기기를 유저에 매핑 */
  async mappingUserDevice(userInitDeviceDto: UserInitDeviceDto){
    const [res] = await this.deviceRepository.find({where:{serial_number: userInitDeviceDto.serial_number}, take:1});
    await this.deviceRepository.update(res.device_id, {device_name: userInitDeviceDto.device_name, user_id: userInitDeviceDto.user_id})
  }

  /** 기기를 화분에 매핑 */
  async mappingPotDevice(potInitDeviceDto: PotInitDeviceDto){
    await this.deviceRepository.update(potInitDeviceDto.device_id, {pot_id: potInitDeviceDto.pot_id})
  }

  async deleteDevice(device_id: number){
    await this.deviceRepository.delete(device_id);
  }

  /** 시리얼 넘버가 DB에 있는지 확인 */
  async checkDevice(serial_number: string): Promise<boolean>{
    const [device] = await this.deviceRepository.find({where: {serial_number}, take: 1})
    if(device == null) return false;
    else return true;
  }

  async mappingPot(device_id: number, pot_id: number){
    return await this.deviceRepository.update(device_id, {pot_id: pot_id});
  }
}
