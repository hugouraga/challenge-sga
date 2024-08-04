import { Injectable } from '@nestjs/common';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { CustomError } from '@/utils/error/custom.error';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

interface UpdateTutorialUseCaseInput {
  tutorialId: string;
  title?: string;
  summary?: string;
  estimatedDuration?: string;
  requirements?: string[];
  difficultyLevel?: DifficultyLevel;
  tags?: string[];
  isDeleted?: boolean;
}

interface UpdateTutorialUseCaseOutput {
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
export class UpdateTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({
    tutorialId,
    title,
    summary,
    estimatedDuration,
    requirements,
    difficultyLevel,
    tags,
    isDeleted,
  }: UpdateTutorialUseCaseInput): Promise<UpdateTutorialUseCaseOutput> {
    const tutorial = await this.tutorialRepository.getById(tutorialId);
    if (!tutorial) {
      throw new CustomError('Tutorial not found', 404);
    }

    tutorial.update({
      title,
      summary,
      estimatedDuration,
      requirements,
      difficultyLevel,
      tags,
      isDeleted,
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
      requirements: updatedTutorial.requirements,
      difficultyLevel: updatedTutorial.difficultyLevel,
      tags: updatedTutorial.tags,
      creatorId: updatedTutorial.creatorId,
      createdAt: updatedTutorial.createdAt,
      updatedAt: updatedTutorial.updatedAt,
      isDeleted: updatedTutorial.isDeleted,
    };
  }
}
