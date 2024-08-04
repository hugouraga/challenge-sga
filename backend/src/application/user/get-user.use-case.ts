import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { CustomError } from '@/utils/error/custom.error';

interface GetUserUseCaseInput {
  userId: string;
}

interface GetUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
    try {
      const user = await this.userRepository.getById(userId);
      if (!user) throw new CustomError('User not found', 404);
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
      throw new CustomError('Error retrieving user', 500);
    }
  }
}
