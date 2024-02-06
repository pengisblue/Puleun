import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './talk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talk]), UserModule],
  controllers: [TalkController],
  providers: [TalkService]
})

export class TalkModule{}
