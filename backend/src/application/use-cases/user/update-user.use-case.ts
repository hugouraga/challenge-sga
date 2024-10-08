import { Injectable } from '@nestjs/common';
import { CustomError } from '@/utils/error/custom.error';
import { UserRepository } from '@/domain/repository/user.repository';

interface UpdateUserUseCaseInput {
  userId: string;
  userEmail?: string;
  userName?: string;
  userPassword?: string;
}

interface UpdateUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userId,
    userEmail,
    userName,
    userPassword,
  }: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
    try {
      const user = await this.userRepository.getById(userId);
      if (!user) throw new CustomError('User not found', 404);
      if (userEmail) {
        const userWithSameEmail =
          await this.userRepository.getByEmail(userEmail);
        if (userWithSameEmail && userWithSameEmail.id !== userId)
          throw new CustomError('Email already in use', 400);
      }

      await user.update({
        email: userEmail,
        name: userName,
        password: userPassword,
      });

      const userResponse = await this.userRepository.update(userId, user);
      const { id, email, name, createdAt, updatedAt } = userResponse;
      return {
        id,
        name,
        email,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Error updating user', 500);
    }
  }
}
