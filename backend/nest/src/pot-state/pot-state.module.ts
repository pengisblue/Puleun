import { Module } from '@nestjs/common';
import { PotStateController } from './pot-state.controller';
import { PotStateService } from './pot-state.service';

@Module({
  controllers: [PotStateController],
  providers: [PotStateService]
})
export class PotStateModule {}
