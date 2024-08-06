import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsEmail({}, { message: 'Endereço de email inválido' })
  userEmail?: string;

  @IsOptional()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  userPassword?: string;

  @IsOptional()
  userName?: string;
}
