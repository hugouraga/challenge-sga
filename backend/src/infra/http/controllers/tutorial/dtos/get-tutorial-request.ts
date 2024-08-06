import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTutorialByIdRequestDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
