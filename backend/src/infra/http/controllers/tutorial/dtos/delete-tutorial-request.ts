import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTutorialRequestDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
