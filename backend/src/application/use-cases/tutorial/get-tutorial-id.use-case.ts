import { Injectable } from '@nestjs/common';
import { CustomError } from '@/utils/error/custom.error';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialRepository } from '@/application/repository/tutorial.repository';

interface GetTutorialUseCaseInput {
  tutorialId: string;
}

interface GetTutorialUseCaseOutput {
  id: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  requirements: string[];
  difficultyLevel: DifficultyLevel;
  tags: string[];
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

@Injectable()
export class GetTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({
    tutorialId,
  }: GetTutorialUseCaseInput): Promise<GetTutorialUseCaseOutput> {
    const tutorial = await this.tutorialRepository.getById(tutorialId);
    if (!tutorial) {
      throw new CustomError('Tutorial not found', 404);
    }

    return {
      id: tutorial.id,
      title: tutorial.title,
      summary: tutorial.summary,
      estimatedDuration: tutorial.estimatedDuration,
      requirements: tutorial.requirements,
      difficultyLevel: tutorial.difficultyLevel,
      tags: tutorial.tags,
      creatorId: tutorial.creatorId,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
      isDeleted: tutorial.isDeleted,
    };
  }
}
