import { Injectable } from '@nestjs/common';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import {
  TutorialFilter,
  TutorialPagination,
  TutorialRepository,
} from '@/domain/repository/tutorial.repository';

export interface GetTutorialsUseCaseInput {
  filters?: TutorialFilter;
  pagination?: TutorialPagination;
}

interface GetTutorialsUseCaseOutput {
  tutorials: {
    id: string;
    title: string;
    summary: string;
    estimatedDuration: string;
    difficultyLevel: DifficultyLevel;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Injectable()
export class GetTutorialsUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({
    filters,
    pagination = { offset: 0, limit: 10 },
  }: GetTutorialsUseCaseInput): Promise<GetTutorialsUseCaseOutput> {
    try {
      if (filters?.difficultyLevel) {
        const validDifficultyLevels = Object.keys(DifficultyLevel).map(
          (key) => DifficultyLevel[key],
        );
        if (!validDifficultyLevels.includes(filters.difficultyLevel)) {
          throw new Error(
            `Invalid difficulty level: ${filters.difficultyLevel}`,
          );
        }
      }
      const result = await this.tutorialRepository.getAll(filters, pagination);
      const total = await this.tutorialRepository.count(filters);
      const totalPages = Math.ceil(total / pagination.limit);
      const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;

      return {
        tutorials: result.map((tutorial) => ({
          id: tutorial.id,
          title: tutorial.title,
          summary: tutorial.summary,
          estimatedDuration: tutorial.estimatedDuration,
          difficultyLevel: tutorial.difficultyLevel,
          createdAt: tutorial.createdAt,
          updatedAt: tutorial.updatedAt,
          isDeleted: tutorial.isDeleted,
        })),
        total,
        page: currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } catch (error) {
      throw new Error('Failed to fetch tutorials');
    }
  }
}
