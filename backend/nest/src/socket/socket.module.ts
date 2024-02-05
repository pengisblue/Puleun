import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotState } from 'src/pot-state/pot-state.entity';
import { SocketService } from './socket.service';
import { PotStateModule } from 'src/pot-state/pot-state.module';
import { DeviceModule } from 'src/device/device.module';
import { SentenceModule } from 'src/sentence/sentence.module';
import { CalenderModule } from 'src/calender/calender.module';
import { TtsModule } from 'src/tts/tts.module';

@Module({
  imports: [ TypeOrmModule.forFeature([PotState]), PotStateModule, 
  DeviceModule, SentenceModule, CalenderModule, TtsModule ],
  controllers:[SocketController],
  providers:[SocketGateway, SocketService],})
export class SocketModule {
}
