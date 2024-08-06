import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateTutorialRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  estimatedDuration: string;

  @IsNotEmpty()
  @IsEnum(DifficultyLevel, { message: 'Invalid difficulty level' })
  difficultyLevel: DifficultyLevel;

  @IsNotEmpty()
  @IsString()
  creatorId: string;
}
