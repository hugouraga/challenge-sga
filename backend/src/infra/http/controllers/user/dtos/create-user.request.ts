import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  userName: string;

  @IsEmail({}, { message: 'Endereço de email inválido' })
  userEmail: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  userPassword: string;
}
