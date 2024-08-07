import {
  Controller,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DeleteTutorialUseCase } from '@/application/use-cases/tutorial/delete-tutorial.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('tutorial')
export class DeleteTutorialController {
  constructor(private readonly deleteTutorialUseCase: DeleteTutorialUseCase) {}

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.deleteTutorialUseCase.execute({
        tutorialId: id,
      });
      return { message: 'Tutorial deletado com sucesso' };
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
