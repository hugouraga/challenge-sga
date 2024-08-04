import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) throw new CustomError('User not found', 404);
      const userWithSameEmail = await this.userRepository.getByEmail(email);
      if (userWithSameEmail && userWithSameEmail.id !== id)
        throw new CustomError('Email already in use', 400);

      user.update({
        name,
        email,
        password,
      });

      return await this.userRepository.update(id, user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error updating user', 500);
    }
  }
}
