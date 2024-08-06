import { Test, TestingModule } from '@nestjs/testing';
import { SignInUserUseCase } from '@/application/use-cases/user/sign-in-user.use-case';
import { CustomError } from '@/utils/error/custom.error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserSignInController } from '@/infra/http/controllers/user/auth-user.controller';
import { SignInUserRequest } from '@/infra/http/controllers/user/dtos/auth-user.request';

describe('User SignIn Controller', () => {
  let controller: UserSignInController;
  let useCase: SignInUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSignInController],
      providers: [
        {
          provide: SignInUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserSignInController>(UserSignInController);
    useCase = module.get<SignInUserUseCase>(SignInUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in a user', async () => {
    const signInRequest: SignInUserRequest = {
      userEmail: 'john@example.com',
      userPassword: 'password123',
    };

    const signedInUser = {
      id: '1',
      name: 'John Doe',
      email: signInRequest.userEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(useCase, 'execute').mockResolvedValue(signedInUser);

    const result = await controller.signin(signInRequest);
    expect(result).toEqual(signedInUser);
    expect(useCase.execute).toHaveBeenCalledWith({
      userEmail: signInRequest.userEmail,
      userPassword: signInRequest.userPassword,
    });
  });

  it('should throw a CustomError for invalid credentials', async () => {
    const signInRequest: SignInUserRequest = {
      userEmail: 'john@example.com',
      userPassword: 'wrongpassword',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new CustomError('Email ou senha inválidos', 401));

    try {
      await controller.signin(signInRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Email ou senha inválidos');
      expect(error.status).toBe(401);
    }
  });

  it('should throw an HttpException for unexpected errors', async () => {
    const signInRequest: SignInUserRequest = {
      userEmail: 'john@example.com',
      userPassword: 'password123',
    };

    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unexpected error'));

    try {
      await controller.signin(signInRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Erro interno no servidor');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
