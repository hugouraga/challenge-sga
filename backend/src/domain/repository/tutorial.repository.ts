import { Tutorial } from '@/domain/entity/tutorial.entity';

export abstract class TutorialRepository {
  abstract getAll(
    filters?: TutorialFilter,
    pagination?: TutorialPagination,
  ): Promise<Tutorial[]>;
  abstract getById(id: string): Promise<Tutorial>;
  abstract getByUserId(userId: string): Promise<Tutorial[]>;
  abstract create(tutorial: Tutorial): Promise<Tutorial>;
  abstract update(
    id: string,
    updatedTutorial: Partial<Tutorial>,
  ): Promise<Tutorial>;
  abstract delete(id: string): Promise<void>;
  abstract count(filters: TutorialFilter): Promise<number>;
}

export interface TutorialFilter {
  title?: string;
  duration?: number;
  summary?: string;
  creatorId?: string;
  difficultyLevel?: string;
  tags?: string[];
}

export interface TutorialPagination {
  limit: number;
  offset: number;
}
