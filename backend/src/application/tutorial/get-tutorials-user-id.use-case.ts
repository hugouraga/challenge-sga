import { Injectable } from '@nestjs/common';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

interface GetTutorialsByUserIdUseCaseInput {
  userId: string;
}

interface GetTutorialsByUserIdUseCaseOutput {
  id: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  requirements: string[];
  difficultyLevel: DifficultyLevel;
  tags: string[];
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
      requirements: tutorial.requirements,
      difficultyLevel: tutorial.difficultyLevel,
      tags: tutorial.tags,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
      isDeleted: tutorial.isDeleted,
    }));
  }
}
