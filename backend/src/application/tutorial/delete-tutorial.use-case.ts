import { Injectable } from '@nestjs/common';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { CustomError } from '@/utils/error/custom.error';

interface DeleteTutorialUseCaseInput {
  tutorialId: string;
}

@Injectable()
export class DeleteTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({ tutorialId }: DeleteTutorialUseCaseInput): Promise<void> {
    const tutorial = await this.tutorialRepository.getById(tutorialId);
    if (!tutorial) {
      throw new CustomError('Tutorial not found', 404);
    }

    tutorial.markAsDeleted();
    await this.tutorialRepository.update(tutorialId, tutorial);
  }
}
