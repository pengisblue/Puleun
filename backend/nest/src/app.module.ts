import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PotModule } from './pot/pot.module';
import { PotStateModule } from './pot-state/pot-state.module';
import { SpeciesModule } from './species/species.module';
import { UserLoginModule } from './user-login/user-login.module';
import { DeviceModule } from './device/device.module';
import { CalenderModule } from './calender/calender.module';
import { TalkModule } from './talk/talk.module';
import { SentenceModule } from './sentence/sentence.module';
import { AlarmModule } from './alarm/alarm.module';
import { CalenderCodeModule } from './calender-code/calender-code.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from './socket/socket.gateway';
import { FileGateway } from './file/file.gateway';
import { FileController } from './file/file.controller';

@Module({
  imports: [UserModule, PotModule, 
    PotStateModule, SpeciesModule, UserLoginModule, DeviceModule, 
    CalenderModule, TalkModule, SentenceModule, AlarmModule, CalenderCodeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 환경에서만 사용 (production에서는 비활성화 권장)
    }),
  ],
  controllers: [AppController, FileController],
  providers: [AppService, SocketGateway, FileGateway],
})
export class AppModule {}
