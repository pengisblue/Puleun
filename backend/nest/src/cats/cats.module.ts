import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CatsController } from './cats.controller';


@Module({
  imports:[DatabaseModule],
  controllers: [CatsController],
  providers: [
    ...catsProviders,
    CatsService
  ]
})
export class CatsModule {}
