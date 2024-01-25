import { Module } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from './pot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pot])],
  controllers: [PotController],
  providers: [PotService]
})
export class PotModule {}
