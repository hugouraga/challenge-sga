import { GetTutorialsUseCase } from '@/application/use-cases/tutorial/get-tutorials.use-case';
import { CustomError } from '@/utils/error/custom.error';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('tutorial')
export class ListTutorialsController {
  constructor(private readonly listTutorialsUseCase: GetTutorialsUseCase) {}

  @UseGuards(AuthGuard)
  @Get()
  async list(): Promise<any> {
    try {
      const tutorials = await this.listTutorialsUseCase.execute();
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
