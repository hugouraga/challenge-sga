import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomError } from '@/utils/error/custom.error';
import { UserRepository } from '@/domain/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getByEmail(email);
    if (user && (await user.comparePassword(password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new CustomError('Invalid email or password', 401);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
