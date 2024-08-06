import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTutorialUseCase } from '@/application/use-cases/tutorial/update-tutorial.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateTutorialController } from '@/infra/http/controllers/tutorial/update-tutorial.controller';
import { UpdateTutorialRequest } from '@/infra/http/controllers/tutorial/dtos/update-tutorial-request';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

describe('UpdateTutorialController', () => {
  let controller: UpdateTutorialController;
  let useCase: UpdateTutorialUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateTutorialController],
      providers: [
        {
          provide: UpdateTutorialUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateTutorialController>(UpdateTutorialController);
    useCase = module.get<UpdateTutorialUseCase>(UpdateTutorialUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a tutorial', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';
    const updateTutorialRequest: UpdateTutorialRequest = {
      title: 'Updated Tutorial',
      summary: 'Updated summary',
      estimatedDuration: '45',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.update(tutorialId, updateTutorialRequest);
    expect(result).toEqual({ message: 'Tutorial atualizado com sucesso' });
    expect(useCase.execute).toHaveBeenCalledWith({
      tutorialId,
      ...updateTutorialRequest,
    });
  });

  it('should throw a CustomError when tutorial is not found', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';
    const updateTutorialRequest: UpdateTutorialRequest = {
      title: 'Updated Tutorial',
      summary: 'Updated summary',
      estimatedDuration: '45',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Tutorial not found', 404));

    try {
      await controller.update(tutorialId, updateTutorialRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Tutorial not found');
      expect(error.status).toBe(404);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const tutorialId = '12345678-1234-1234-1234-123456789012';
    const updateTutorialRequest: UpdateTutorialRequest = {
      title: 'Updated Tutorial',
      summary: 'Updated summary',
      estimatedDuration: '45',
      difficultyLevel: DifficultyLevel.Beginner,
      creatorId: '12345678-1234-1234-1234-123456789012',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.update(tutorialId, updateTutorialRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
