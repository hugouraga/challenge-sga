import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator';

export class CreateTutorialRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  estimatedDuration: string; // em minutos

  @IsNotEmpty()
  @IsEnum(DifficultyLevel, { message: 'Invalid difficulty level' })
  difficultyLevel: DifficultyLevel;

  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
