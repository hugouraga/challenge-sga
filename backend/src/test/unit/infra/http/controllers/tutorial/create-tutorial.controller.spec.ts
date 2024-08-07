import { Test, TestingModule } from '@nestjs/testing';
import { CreateTutorialUseCase } from '@/application/use-cases/tutorial/create-tutorial.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTutorialController } from '@/infra/http/controllers/tutorial/create-tutorial.controller';
import { CreateTutorialRequest } from '@/infra/http/controllers/tutorial/dtos/create-tutorial-request';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/infra/http/auth/jwt-auth.guard';

describe('Create Tutorial Controller', () => {
  let controller: CreateTutorialController;
  let useCase: CreateTutorialUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTutorialController],
      providers: [
        {
          provide: CreateTutorialUseCase,
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

    controller = module.get<CreateTutorialController>(CreateTutorialController);
    useCase = module.get<CreateTutorialUseCase>(CreateTutorialUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a tutorial', async () => {
    const createTutorialRequest: CreateTutorialRequest = {
      title: 'Test Tutorial',
      summary: 'This is a test tutorial',
      estimatedDuration: '30',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
      isDeleted: false,
    };

    const createdTutorial = {
      ...createTutorialRequest,
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(createdTutorial);

    const result = await controller.create(createTutorialRequest);
    expect(result).toEqual(createdTutorial);
    expect(useCase.execute).toHaveBeenCalledWith(createTutorialRequest);
  });

  it('should throw a CustomError for invalid input', async () => {
    const createTutorialRequest: CreateTutorialRequest = {
      title: 'Test Tutorial',
      summary: 'This is a test tutorial',
      estimatedDuration: '30',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
      isDeleted: false,
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Invalid input', 400));

    try {
      await controller.create(createTutorialRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Invalid input');
      expect(error.status).toBe(400);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const createTutorialRequest: CreateTutorialRequest = {
      title: 'Test Tutorial',
      summary: 'This is a test tutorial',
      estimatedDuration: '30',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
      isDeleted: false,
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.create(createTutorialRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
