import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './cats.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cats])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
