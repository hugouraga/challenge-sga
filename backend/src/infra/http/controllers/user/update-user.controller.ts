import {
  Controller,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserUseCase } from '@/application/use-cases/user/update-user.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { UpdateUserRequest } from './dtos/update-user.request';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user')
export class UserUpdateController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ) {
    try {
      const { userName, userEmail, userPassword } = updateUserRequest;

      await this.updateUser.execute({
        userId: id,
        userEmail,
        userName,
        userPassword,
      });

      return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(
        'Erro interno no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
