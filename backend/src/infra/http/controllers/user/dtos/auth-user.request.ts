import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInUserRequest {
  @IsEmail({}, { message: 'Endereço de email inválido' })
  userEmail: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  userPassword: string;
}
