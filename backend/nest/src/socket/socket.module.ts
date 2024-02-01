import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotState } from 'src/pot-state/pot-state.entity';
import { SocketService } from './socket.service';
import { PotStateModule } from 'src/pot-state/pot-state.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [ TypeOrmModule.forFeature([PotState]), PotStateModule, DeviceModule ],
  controllers:[SocketController],
  providers:[SocketGateway, SocketService],})
export class SocketModule {
}
