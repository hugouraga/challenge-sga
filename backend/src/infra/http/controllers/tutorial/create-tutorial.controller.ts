import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateTutorialUseCase } from '@/application/use-cases/tutorial/create-tutorial.use-case';
import { CreateTutorialRequest } from './dtos/create-tutorial-request';
import { CustomError } from '@/utils/error/custom.error';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('tutorial')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class CreateTutorialController {
  constructor(private readonly createTutorialUseCase: CreateTutorialUseCase) {}

  @UseGuards(AuthGuard)
  @Post('/new')
  async create(
    @Body() createTutorialRequest: CreateTutorialRequest,
  ): Promise<any> {
    try {
      const tutorial = await this.createTutorialUseCase.execute(
        createTutorialRequest,
      );
      return tutorial;
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
