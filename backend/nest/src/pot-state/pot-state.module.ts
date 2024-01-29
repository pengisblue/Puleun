import { Module } from '@nestjs/common';
import { PotStateController } from './pot-state.controller';
import { PotStateService } from './pot-state.service';
import { PotState } from './pot-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PotState])],
  controllers: [PotStateController],
  providers: [PotStateService],
  exports: [PotStateService],
})
export class PotStateModule {}
