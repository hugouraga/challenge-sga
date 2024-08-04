import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';

interface CreateUserUseCaseInput {
  userName: string;
  userEmail: string;
  password: string;
}

interface CreateUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userName,
    userEmail,
    password,
  }: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
    try {
      const existingUser = await this.userRepository.getByEmail(userEmail);
      if (existingUser) throw new CustomError('Email already in use', 400);
      const user = await User.createNew(userName, userEmail, password);
      const userResponse = await this.userRepository.create(user);
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
      throw new CustomError('Error creating user', 500);
    }
  }
}
