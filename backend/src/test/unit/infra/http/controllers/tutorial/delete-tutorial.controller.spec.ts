import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTutorialUseCase } from '@/application/use-cases/tutorial/delete-tutorial.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteTutorialController } from '@/infra/http/controllers/tutorial/delete-tutorial.controller';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/infra/http/auth/jwt-auth.guard';

describe('Delete Tutorial Controller', () => {
  let controller: DeleteTutorialController;
  let useCase: DeleteTutorialUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteTutorialController],
      providers: [
        {
          provide: DeleteTutorialUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-token'),
            verify: jest.fn(() => ({ userId: 1 })),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    controller = module.get<DeleteTutorialController>(DeleteTutorialController);
    useCase = module.get<DeleteTutorialUseCase>(DeleteTutorialUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delete a tutorial successfully', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';

    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.delete(tutorialId);
    expect(result).toEqual({ message: 'Tutorial deletado com sucesso' });
    expect(useCase.execute).toHaveBeenCalledWith({ tutorialId });
  });

  it('should throw a CustomError when tutorial is not found', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Tutorial not found', 404));

    try {
      await controller.delete(tutorialId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Tutorial not found');
      expect(error.status).toBe(404);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.delete(tutorialId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
