import { GetTutorialUseCase } from '@/application/use-cases/tutorial/get-tutorial-id.use-case';
import { CustomError } from '@/utils/error/custom.error';
import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('tutorial')
export class GetTutorialByIdController {
  constructor(private getTutorialUseCase: GetTutorialUseCase) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    try {
      const tutorial = await this.getTutorialUseCase.execute({
        tutorialId: id,
      });
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
