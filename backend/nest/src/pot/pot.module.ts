import { Module } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pot]), UserModule],
  controllers: [PotController],
  providers: [PotService],
  exports:[PotService]

})
export class PotModule {}
