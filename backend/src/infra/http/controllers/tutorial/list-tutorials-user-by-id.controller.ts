import { GetTutorialsByUserIdUseCase } from '@/application/use-cases/tutorial/get-tutorials-user-id.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { AuthGuard } from '../../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';

@Controller('tutorials')
export class ListTutorialsUserByIdController {
  constructor(
    private readonly listTutorialsByUserIdUseCase: GetTutorialsByUserIdUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/list/:creatorId')
  async list(@Param('creatorId') creatorId: string): Promise<any> {
    try {
      return this.listTutorialsByUserIdUseCase.execute({ userId: creatorId });
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
