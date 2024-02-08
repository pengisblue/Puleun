import { Module } from '@nestjs/common';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { Alarm } from './alarm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm]), UserModule],
  controllers: [AlarmController],
  providers: [AlarmService]
})

export class AlarmModule {}
