import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';

@Injectable()
export class SignInUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) throw new CustomError('Invalid email or password', 401);
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        throw new CustomError('Invalid email or password', 401);
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error signing in user', 500);
    }
  }
}
