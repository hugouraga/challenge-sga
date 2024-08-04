import { Injectable } from '@nestjs/common';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { UserRepository } from '@/domain/repository/user.repository';
import { Tutorial } from '@/domain/entity/tutorial.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { CustomError } from '@/utils/error/custom.error';

interface CreateTutorialUseCaseInput {
  title: string;
  summary: string;
  estimatedDuration: string;
  requirements: string[];
  difficultyLevel: DifficultyLevel;
  tags: string[];
  creatorId: string;
}

interface CreateTutorialUseCaseOutput {
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
export class CreateTutorialUseCase {
  constructor(
    private readonly tutorialRepository: TutorialRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    title,
    creatorId,
    difficultyLevel,
    estimatedDuration,
    requirements,
    summary,
    tags,
  }: CreateTutorialUseCaseInput): Promise<CreateTutorialUseCaseOutput> {
    const creator = await this.userRepository.getById(creatorId);
    if (!creator) {
      throw new CustomError('Creator not found', 404);
    }

    const tutorial = Tutorial.createNew(
      title,
      summary,
      estimatedDuration,
      requirements,
      difficultyLevel,
      tags,
      creatorId,
    );

    const tutorialResponse = await this.tutorialRepository.create(tutorial);

    return {
      id: tutorialResponse.id,
      title: tutorialResponse.title,
      summary: tutorialResponse.summary,
      estimatedDuration: tutorialResponse.estimatedDuration,
      requirements: tutorialResponse.requirements,
      difficultyLevel: tutorialResponse.difficultyLevel,
      tags: tutorialResponse.tags,
      creatorId: tutorialResponse.creatorId,
      createdAt: tutorialResponse.createdAt,
      updatedAt: tutorialResponse.updatedAt,
      isDeleted: tutorialResponse.isDeleted,
    };
  }
}
