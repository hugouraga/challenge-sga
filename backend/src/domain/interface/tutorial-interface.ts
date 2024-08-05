import { DifficultyLevel } from '../../utils/enum/difiiculty-level-enum';

export interface TutorialInterface {
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
