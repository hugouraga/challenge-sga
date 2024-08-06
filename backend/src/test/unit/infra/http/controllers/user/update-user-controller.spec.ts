import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from '@/application/use-cases/user/update-user.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserUpdateController } from '@/infra/http/controllers/user/update-user.controller';
import { UpdateUserRequest } from '@/infra/http/controllers/user/dtos/update-user.request';

describe('User Update Controller', () => {
  let controller: UserUpdateController;
  let useCase: UpdateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserUpdateController],
      providers: [
        {
          provide: UpdateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserUpdateController>(UserUpdateController);
    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a user', async () => {
    const updateUserRequest: UpdateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'newpassword123',
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.update('1', updateUserRequest);
    expect(result).toEqual({ message: 'Usuário atualizado com sucesso' });
    expect(useCase.execute).toHaveBeenCalledWith({
      userId: '1',
      userEmail: updateUserRequest.userEmail,
      userName: updateUserRequest.userName,
      userPassword: updateUserRequest.userPassword,
    });
  });

  it('should throw a CustomError when user is not found', async () => {
    const updateUserRequest: UpdateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'newpassword123',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('User not found', 404));

    try {
      await controller.update('1', updateUserRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User not found');
      expect(error.status).toBe(404);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const updateUserRequest: UpdateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'newpassword123',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.update('1', updateUserRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
