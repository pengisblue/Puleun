import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotState } from 'src/pot-state/pot-state.entity';
import { SocketService } from './socket.service';
import { PotStateModule } from 'src/pot-state/pot-state.module';
import { DeviceModule } from 'src/device/device.module';
import { SentenceModule } from 'src/sentence/sentence.module';
import { CalenderModule } from 'src/calender/calender.module';
import { TtsModule } from 'src/tts/tts.module';
import { RedisModule } from 'src/redis/redis.module';
import { FileModule } from 'src/file/file.module';
import { TalkModule } from 'src/talk/talk.module';
import { PotModule } from 'src/pot/pot.module';

@Module({
  imports: [ TypeOrmModule.forFeature([PotState]), PotStateModule, FileModule, TalkModule,
  DeviceModule, SentenceModule, CalenderModule, TtsModule, RedisModule, PotModule],
  providers:[SocketGateway, SocketService],
  exports:[SocketGateway]})
export class SocketModule {
}
