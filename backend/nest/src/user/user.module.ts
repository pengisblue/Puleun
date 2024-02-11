import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserLoginModule } from 'src/user-login/user-login.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UserLoginModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
