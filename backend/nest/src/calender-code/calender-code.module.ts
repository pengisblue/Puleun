import { Module } from '@nestjs/common';
import { CalenderCodeController } from './calender-code.controller';
import { CalenderCodeService } from './calender-code.service';

@Module({
  controllers: [CalenderCodeController],
  providers: [CalenderCodeService]
})
export class CalenderCodeModule {}
