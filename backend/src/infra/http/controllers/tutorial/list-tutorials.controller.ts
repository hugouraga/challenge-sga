import { GetTutorialUseCase } from '@/application/use-cases/tutorial/get-tutorial-id.use-case';
import { CustomError } from '@/utils/error/custom.error';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('tutorials')
export class ListTutorialsController {
  constructor(private readonly listTutorialsUseCase: GetTutorialUseCase) {}

  @Get()
  async list(@Query() query: any): Promise<any> {
    try {
      const tutorials = await this.listTutorialsUseCase.execute(query);
      return tutorials;
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
