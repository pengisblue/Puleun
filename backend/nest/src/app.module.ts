import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
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

@Module({
  imports: [CatsModule, DatabaseModule, UserModule, PotModule, PotStateModule, SpeciesModule, UserLoginModule, DeviceModule, CalenderModule, TalkModule, SentenceModule, AlarmModule, CalenderCodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
