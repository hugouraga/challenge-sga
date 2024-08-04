import { Tutorial } from '@/domain/entity/tutorial.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

export abstract class TutorialRepository {
  abstract getAll(
    filters: TutorialFilter,
    pagination: TutorialPagination,
  ): Promise<Tutorial[]>;
  abstract getById(id: string): Promise<Tutorial>;
  abstract create(tutorial: Tutorial): Promise<Tutorial>;
  abstract update(
    id: string,
    updatedTutorial: Partial<Tutorial>,
  ): Promise<Tutorial>;
  abstract delete(id: string): Promise<void>;
}

export interface TutorialFilter {
  title?: string;
  summary?: string;
  creatorId?: string;
  difficultyLevel?: DifficultyLevel;
  tags?: string[];
}

export interface TutorialPagination {
  limit: number;
  offset: number;
}
