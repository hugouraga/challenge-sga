import { Injectable } from '@nestjs/common';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';

interface GetTutorialsByUserIdUseCaseInput {
  userId: string;
}

interface GetTutorialsByUserIdUseCaseOutput {
  id: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  difficultyLevel: DifficultyLevel;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

@Injectable()
export class GetTutorialsByUserIdUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({
    userId,
  }: GetTutorialsByUserIdUseCaseInput): Promise<
    GetTutorialsByUserIdUseCaseOutput[]
  > {
    const tutorials = await this.tutorialRepository.getByUserId(userId);
    if (!tutorials) return [];
    return tutorials.map((tutorial) => ({
      id: tutorial.id,
      title: tutorial.title,
      summary: tutorial.summary,
      estimatedDuration: tutorial.estimatedDuration,
      difficultyLevel: tutorial.difficultyLevel,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
      isDeleted: tutorial.isDeleted,
    }));
  }
}
