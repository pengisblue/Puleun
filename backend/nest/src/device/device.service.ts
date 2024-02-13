import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { DeviceCreateDto, DeviceUpdateDto, SelectDeviceDto } from './device-req.dto';

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
  
  async emptyDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, empty_FG: false},
      select: {device_id: true, serial_number: true}
    })
  }

  async unEmptyDevice(user_id: number): Promise<SelectDeviceDto[]>{
    return this.deviceRepository.find({
      where: {user_id, empty_FG: true},
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

  async mappingDevice(device_id: number){
    const flag = (await this.deviceRepository.findOne({where: {device_id: device_id}})).empty_FG;
    console.log(flag);
    await this.deviceRepository.update(device_id, {empty_FG: !flag});
  }

  async deleteDevice(device_id: number){
    await this.deviceRepository.delete(device_id);
  }
}
