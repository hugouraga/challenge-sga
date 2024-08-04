import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) throw new CustomError('User not found', 404);
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error retrieving user', 500);
    }
  }
}
