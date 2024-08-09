import { Injectable } from '@nestjs/common';
import { CustomError } from '@/utils/error/custom.error';
import { UserRepository } from '@/domain/repository/user.repository';

interface GetUsersUseCaseInput {
  name?: string;
  page: number;
  limit?: number;
}

interface GetUsersUseCaseOutput {
  users: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    page,
    limit = 100,
  }: GetUsersUseCaseInput): Promise<GetUsersUseCaseOutput> {
    try {
      const result = await this.userRepository.findUsers({ name, page, limit });

      return {
        users: result.users.map(
          (user: {
            id: any;
            name: any;
            email: any;
            createdAt: any;
            updatedAt: any;
          }) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }),
        ),
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPreviousPage: result.hasPreviousPage,
      };
    } catch (error) {
      throw new CustomError('Error retrieving users', 500);
    }
  }
}
