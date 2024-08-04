import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.userRepository.getByEmail(email);
      if (existingUser) throw new CustomError('Email already in use', 400);
      const user = await User.createNew(name, email, password);
      return await this.userRepository.create(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error creating user', 500);
    }
  }
}
