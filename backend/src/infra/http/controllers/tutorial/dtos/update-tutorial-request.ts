import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateTutorialRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  estimatedDuration?: string;

  @IsOptional()
  @IsEnum(DifficultyLevel, { message: 'Invalid difficulty level' })
  difficultyLevel?: DifficultyLevel;

  @IsOptional()
  @IsString()
  creatorId?: string;
}
