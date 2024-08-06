import {
  Controller,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateTutorialUseCase } from '@/application/use-cases/tutorial/update-tutorial.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { UpdateTutorialRequest } from './dtos/update-tutorial-request';

@Controller('tutorial')
export class UpdateTutorialController {
  constructor(private readonly updateTutorialUseCase: UpdateTutorialUseCase) {}

  @Put('/edit/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTutorialRequest: UpdateTutorialRequest,
  ) {
    try {
      const { creatorId, difficultyLevel, estimatedDuration, summary, title } =
        updateTutorialRequest;

      await this.updateTutorialUseCase.execute({
        tutorialId: id,
        difficultyLevel,
        estimatedDuration,
        summary,
        title,
        creatorId,
      });
      return { message: 'Tutorial atualizado com sucesso' };
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
