import { GetTutorialsUseCase } from '@/application/use-cases/tutorial/get-tutorials.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { AuthGuard } from '../../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  TutorialFilter,
  TutorialPagination,
} from '@/domain/repository/tutorial.repository';

@Controller('tutorials')
export class ListTutorialsController {
  constructor(private readonly listTutorialsUseCase: GetTutorialsUseCase) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async list(
    @Query('creatorId') creatorId?: string,
    @Query('title') title?: string,
    @Query('duration') duration?: number,
    @Query('summary') summary?: string,
    @Query('difficultyLevel') difficultyLevel?: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ): Promise<any> {
    try {
      const filters: TutorialFilter = {
        creatorId,
        title,
        duration,
        summary,
        difficultyLevel,
      };

      const pagination: TutorialPagination = {
        offset: offset ? parseInt(offset, 10) : 0,
        limit: limit ? parseInt(limit, 10) : 10,
      };

      if (isNaN(pagination.offset) || pagination.offset < 0) {
        throw new CustomError('Offset inválido', HttpStatus.BAD_REQUEST);
      }

      if (isNaN(pagination.limit) || pagination.limit <= 0) {
        throw new CustomError('Limit inválido', HttpStatus.BAD_REQUEST);
      }

      return this.listTutorialsUseCase.execute({
        filters,
        pagination,
      });
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
