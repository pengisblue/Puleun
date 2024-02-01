import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { DeviceCreateDto } from './device-req.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ){}

  async findBySerialNumber(serial_number: string): Promise<Device>{
    return this.deviceRepository.findOneBy({serial_number});
  }
  
  async save(device: DeviceCreateDto): Promise<number>{
    this.deviceRepository.save(device)
    return 1;
  }
}
