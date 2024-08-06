import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SignInUserUseCase } from '@/application/use-cases/user/sign-in-user.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { SignInUserRequest } from './dtos/auth-user.request';

@Controller('user')
export class UserSignInController {
  constructor(private readonly signInUserUseCase: SignInUserUseCase) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinRequest: SignInUserRequest): Promise<any> {
    try {
      const user = await this.signInUserUseCase.execute({
        userEmail: signinRequest.userEmail,
        userPassword: signinRequest.userPassword,
      });

      if (!user) {
        throw new CustomError(
          'Email ou senha inválidos',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof CustomError)
        throw new HttpException(error.message, error.statusCode);

      throw new HttpException(
        'Erro interno no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
