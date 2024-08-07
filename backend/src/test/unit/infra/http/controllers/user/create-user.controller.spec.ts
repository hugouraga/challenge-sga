import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { UserCreateController } from '@/infra/http/controllers/user/create-user.controller';
import { CreateUserRequest } from '@/infra/http/controllers/user/dtos/create-user.request';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/infra/http/auth/jwt-auth.guard';

describe('User Create Controller', () => {
  let controller: UserCreateController;
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [
        {
          provide: CreateUserUseCase,
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

    controller = module.get<UserCreateController>(UserCreateController);
    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserRequest: CreateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'password123',
    };

    const createdUser = {
      id: '1',
      name: createUserRequest.userName,
      email: createUserRequest.userEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(createdUser);

    const result = await controller.create(createUserRequest);
    expect(result).toEqual(createdUser);
    expect(useCase.execute).toHaveBeenCalledWith({
      userName: createUserRequest.userName,
      userEmail: createUserRequest.userEmail,
      password: createUserRequest.userPassword,
    });
  });

  it('should throw a CustomError when user already exists', async () => {
    const createUserRequest: CreateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'password123',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Email already in use', 400));

    try {
      await controller.create(createUserRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Email already in use');
      expect(error.status).toBe(400);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const createUserRequest: CreateUserRequest = {
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPassword: 'password123',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.create(createUserRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Internal server error');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
