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

  async findByPotId(pot_id: number): Promise<string>{
    const [res] = await this.deviceRepository.find({where:{pot_id}, take:1})
    return res.client_id
  }
  
  async save(device: DeviceCreateDto): Promise<number>{
    this.deviceRepository.save(device)
    return 1;
  }

  /** 유저의 디바이스 중 식물이 없는 디바이스 출력 */
  async unMappingDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, pot_id: IsNull()},
      select: {device_id: true, serial_number: true, device_name: true}
    })
  }

  async mappingDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, pot_id: Not(IsNull())},
      select: {device_id: true, serial_number: true, device_name: true}
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
    return await this.deviceRepository.update(device_id, {pot_id, empty_FG: false});
  }

  async collectionDevice(pot_id: number){
    return await this.deviceRepository.update({pot_id}, {pot_id: null, empty_FG: true});
  }

}
