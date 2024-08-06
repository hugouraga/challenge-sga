import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTutorialUseCase } from '@/application/use-cases/tutorial/create-tutorial.use-case';
import { CreateTutorialRequest } from './dtos/create-tutorial-request';
import { CustomError } from '@/utils/error/custom.error';

@Controller('tutorial')
export class CreateTutorialController {
  constructor(private readonly createTutorialUseCase: CreateTutorialUseCase) {}

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
      console.log(error);
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
