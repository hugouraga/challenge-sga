import { Injectable } from '@nestjs/common';
import { CustomError } from '@/utils/error/custom.error';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';

interface UpdateTutorialUseCaseInput {
  tutorialId: string;
  title?: string;
  summary?: string;
  estimatedDuration?: string;
  difficultyLevel?: DifficultyLevel;
  isDeleted?: boolean;
  creatorId?: string;
}

interface UpdateTutorialUseCaseOutput {
  id: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  difficultyLevel: DifficultyLevel;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

@Injectable()
export class UpdateTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({
    tutorialId,
    title,
    summary,
    estimatedDuration,
    difficultyLevel,
    isDeleted,
    creatorId,
  }: UpdateTutorialUseCaseInput): Promise<UpdateTutorialUseCaseOutput> {
    const tutorial = await this.tutorialRepository.getById(tutorialId);
    if (!tutorial) {
      throw new CustomError('Tutorial not found', 404);
    }

    tutorial.update({
      title,
      summary,
      estimatedDuration,
      difficultyLevel,
      isDeleted,
      creatorId,
    });

    const updatedTutorial = await this.tutorialRepository.update(
      tutorialId,
      tutorial,
    );

    return {
      id: updatedTutorial.id,
      title: updatedTutorial.title,
      summary: updatedTutorial.summary,
      estimatedDuration: updatedTutorial.estimatedDuration,
      difficultyLevel: updatedTutorial.difficultyLevel,
      creatorId: updatedTutorial.creatorId,
      createdAt: updatedTutorial.createdAt,
      updatedAt: updatedTutorial.updatedAt,
      isDeleted: updatedTutorial.isDeleted,
    };
  }
}
