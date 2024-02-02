import { Module } from '@nestjs/common';
import { PotStateController } from './pot-state.controller';
import { PotStateService } from './pot-state.service';
import { PotState } from './pot-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotModule } from 'src/pot/pot.module';
import { CalenderModule } from 'src/calender/calender.module';

@Module({
  imports:[TypeOrmModule.forFeature([PotState]), PotModule, CalenderModule],
  controllers: [PotStateController],
  providers: [PotStateService],
  exports: [PotStateService]
})
export class PotStateModule {}
