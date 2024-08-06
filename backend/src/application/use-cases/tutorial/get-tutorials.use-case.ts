import { Injectable } from '@nestjs/common';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';

interface GetTutorialsUseCaseOutput {
  id: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  difficultyLevel: DifficultyLevel;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
[];

@Injectable()
export class GetTutorialsUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute(): Promise<GetTutorialsUseCaseOutput[]> {
    const tutorials = await this.tutorialRepository.getAll();
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
