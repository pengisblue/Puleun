import { Module } from '@nestjs/common';
import { UserLoginController } from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogin])],
  controllers: [UserLoginController],
  providers: [UserLoginService]
})
export class UserLoginModule {}
