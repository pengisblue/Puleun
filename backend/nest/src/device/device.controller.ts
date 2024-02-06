import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SelectDeviceDto } from './device-req.dto';


@Controller('device')
@ApiTags('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService){}

    @Get('unMapping/:user_id')
    @ApiOperation({summary: '비어있는 디바이스 출력'})
    async emptyDevice(@Param('user_id') user_id: number): Promise<SelectDeviceDto[]>{
        return await this.deviceService.emptyDevice(user_id);
    }

    @Get('Mapping/:user_id')
    @ApiOperation({summary: '비어있지 않은 디바이스 출력'})
    async unEmptyDevice(@Param('user_id') user_id: number): Promise<SelectDeviceDto[]>{
        return await this.deviceService.unEmptyDevice(user_id);
    }

    @Put(':user_id')
    @ApiOperation({summary: '디바이스 화분에 매핑 또는 Un매핑'})
    async updateDevice(@Param('user_id') user_id: number): Promise<number>{
        await this.deviceService.mappingDevice(user_id);
        return 1;
    }

    @Delete(':device_id')
    @ApiOperation({summary: '디바이스 삭제'})
    async deleteDevice(@Param('device_id') device_id: number): Promise<number>{
        await this.deviceService.deleteDevice(device_id);
        return 1;
    }
}
