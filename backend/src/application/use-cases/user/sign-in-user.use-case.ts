import { Injectable } from '@nestjs/common';
import { CustomError } from '@/utils/error/custom.error';
import { UserRepository } from '@/domain/repository/user.repository';

interface SignInUserUseCaseInput {
  userEmail: string;
  userPassword: string;
}

interface SignInUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SignInUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userEmail,
    userPassword,
  }: SignInUserUseCaseInput): Promise<SignInUserUseCaseOutput> {
    try {
      const user = await this.userRepository.getByEmail(userEmail);
      if (!user) throw new CustomError('Invalid email or password', 401);
      const isPasswordValid = await user.comparePassword(userPassword);
      if (!isPasswordValid)
        throw new CustomError('Invalid email or password', 401);
      const { id, email, name, createdAt, updatedAt } = user;
      return {
        id,
        name,
        email,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error signing in user', 500);
    }
  }
}
