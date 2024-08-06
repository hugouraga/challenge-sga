import { Module } from '@nestjs/common';
import { UserModule } from './_user.module';
import { TutorialModule } from './_tutorial.module';

@Module({
  imports: [UserModule, TutorialModule],
})
export class HttpModule {}
