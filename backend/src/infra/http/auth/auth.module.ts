import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../_user.module';
import { TutorialModule } from '../_tutorial.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import 'dotenv/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => TutorialModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
