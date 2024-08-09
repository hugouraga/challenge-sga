import { GetTutorialsUseCase } from '@/application/use-cases/tutorial/get-tutorials.use-case';
import { CustomError } from '@/utils/error/custom.error';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('tutorials')
export class ListTutorialsController {
  constructor(private readonly listTutorialsUseCase: GetTutorialsUseCase) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async list(@Query('creatorId') creatorId?: string): Promise<any> {
    try {
      const tutorials = await this.listTutorialsUseCase.execute({ creatorId });
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
