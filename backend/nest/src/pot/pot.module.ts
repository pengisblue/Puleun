import { Module } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';

@Module({
  controllers: [PotController],
  providers: [PotService]
})
export class PotModule {}
