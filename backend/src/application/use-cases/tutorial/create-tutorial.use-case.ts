import { Injectable } from '@nestjs/common';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { CustomError } from '@/utils/error/custom.error';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { UserRepository } from '@/domain/repository/user.repository';
import { Tutorial } from '@/domain/entity/tutorial.entity';

interface CreateTutorialUseCaseInput {
  title: string;
  summary: string;
  estimatedDuration: string;
  difficultyLevel: DifficultyLevel;
  creatorId: string;
}

interface CreateTutorialUseCaseOutput {
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
    summary,
  }: CreateTutorialUseCaseInput): Promise<CreateTutorialUseCaseOutput> {
    const creator = await this.userRepository.getById(creatorId);
    if (!creator) {
      throw new CustomError('Creator not found', 404);
    }

    const tutorial = Tutorial.createNew(
      title,
      summary,
      estimatedDuration,
      difficultyLevel,
      creatorId,
    );

    const tutorialResponse = await this.tutorialRepository.create(tutorial);

    return {
      id: tutorialResponse.id,
      title: tutorialResponse.title,
      summary: tutorialResponse.summary,
      estimatedDuration: tutorialResponse.estimatedDuration,
      difficultyLevel: tutorialResponse.difficultyLevel,
      creatorId: tutorialResponse.creatorId,
      createdAt: tutorialResponse.createdAt,
      updatedAt: tutorialResponse.updatedAt,
      isDeleted: tutorialResponse.isDeleted,
    };
  }
}
