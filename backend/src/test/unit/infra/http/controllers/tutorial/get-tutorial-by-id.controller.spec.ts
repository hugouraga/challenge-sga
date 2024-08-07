import { Test, TestingModule } from '@nestjs/testing';
import { GetTutorialUseCase } from '@/application/use-cases/tutorial/get-tutorial-id.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetTutorialByIdController } from '@/infra/http/controllers/tutorial/get-tutorial-by-id.controller';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/infra/http/auth/jwt-auth.guard';

describe('Get Tutorial By Id Controller', () => {
  let controller: GetTutorialByIdController;
  let useCase: GetTutorialUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTutorialByIdController],
      providers: [
        {
          provide: GetTutorialUseCase,
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

    controller = module.get<GetTutorialByIdController>(
      GetTutorialByIdController,
    );
    useCase = module.get<GetTutorialUseCase>(GetTutorialUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a tutorial by id', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';
    const tutorial = {
      id: tutorialId,
      title: 'Tutorial 1',
      summary: 'Summary 1',
      estimatedDuration: '30',
      requirements: ['requirement1', 'requirement2'],
      difficultyLevel: DifficultyLevel.Beginner,
      tags: ['tag1', 'tag2'],
      creatorId: '12345678-1234-1234-1234-123456789012',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(tutorial);

    const result = await controller.getById(tutorialId);
    expect(result).toEqual(tutorial);
    expect(useCase.execute).toHaveBeenCalledWith({ tutorialId });
  });

  it('should throw a CustomError when tutorial is not found', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Tutorial not found', 404));

    try {
      await controller.getById(tutorialId);
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
      await controller.getById(tutorialId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
