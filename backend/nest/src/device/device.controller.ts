import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PotInitDeviceDto, SelectDeviceDto, UserInitDeviceDto } from './device-req.dto';
import { BlockList } from 'net';


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

    @Put('user')
    @ApiOperation({summary: '디바이스의 주인과 이름을 지정'})
    async updateUserDevice(@Body() userInitDeviceDto: UserInitDeviceDto): Promise<string>{
        await this.deviceService.mappingUserDevice(userInitDeviceDto);
        return 'SUCCESS';
    }

    @Put('pot')
    @ApiOperation({summary: '디바이스에 화분을 지정'})
    async updatePotDevice(@Body() potInitDeviceDto: PotInitDeviceDto): Promise<string>{
        await this.deviceService.mappingPotDevice(potInitDeviceDto);
        return 'SUCCESS';
    }

    @Get('check/:serial_number')
    @ApiOperation({summary: '시리얼 넘버가 DB에 있는지 확인'})
    @ApiOkResponse({type: Boolean})
    async checkDevice(@Param('serial_number') serial_number: string,): Promise<Boolean>{
        return await this.deviceService.checkDevice(serial_number);
    }

    @Delete(':device_id')
    @ApiOperation({summary: '디바이스 삭제'})
    async deleteDevice(@Param('device_id') device_id: number): Promise<number>{
        await this.deviceService.deleteDevice(device_id);
        return 1;
    }
}
