import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { CreateUserRequest } from './dtos/create-user.request';
import { CustomError } from '@/utils/error/custom.error';

@Controller('user')
export class UserCreateController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    try {
      const registerUser = await this.createUser.execute({
        userName: createUserRequest.userName,
        userEmail: createUserRequest.userEmail,
        password: createUserRequest.userPassword,
      });
      return registerUser;
    } catch (error) {
      if (error instanceof CustomError)
        throw new HttpException(error.message, error.statusCode);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
