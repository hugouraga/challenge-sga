import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateTutorialRequest {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O campo `title` tem que ser do tipo string' })
  title: string;

  @IsNotEmpty({ message: 'O sumário é obrigatório' })
  @IsString({ message: 'O campo `summary` tem que ser do tipo string' })
  summary: string;

  @IsNotEmpty({ message: 'O tempo estimado é obrigatório' })
  @IsString({
    message: 'O campo `estimatedDuration` tem que ser do tipo string',
  })
  estimatedDuration: string; // em horas

  @IsNotEmpty({ message: 'O nível de dificuldade é obrigatório' })
  @IsEnum(DifficultyLevel, { message: 'Nível de dificuldade inválido' })
  difficultyLevel: DifficultyLevel;

  @IsNotEmpty({
    message: 'É necessário informar o usuário responsável pelo tutorial',
  })
  @IsString({ message: 'O campo `creatorId` tem que ser do tipo string' })
  creatorId: string;

  @IsOptional()
  isDeleted: boolean;
}
