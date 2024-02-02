import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
@Module({
  providers: [TtsService],
})
export class TtsModule {}
