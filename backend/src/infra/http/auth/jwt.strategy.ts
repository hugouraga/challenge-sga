import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { CustomError } from '@/utils/error/custom.error';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secret: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(
      payload.username,
      payload.sub,
    );
    if (!user) {
      throw new CustomError('Invalid token', 401);
    }
    return user;
  }
}
