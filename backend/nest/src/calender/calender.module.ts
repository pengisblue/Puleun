import { Module } from '@nestjs/common';
import { CalenderController } from './calender.controller';
import { CalenderService } from './calender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calender } from './calender.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Calender])],
  controllers: [CalenderController],
  providers: [CalenderService]
})
export class CalenderModule {}
