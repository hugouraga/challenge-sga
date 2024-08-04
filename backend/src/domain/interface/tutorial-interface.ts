import { DifficultyLevel } from './difiiculty-level-enum';

export interface TutorialInterface {
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
