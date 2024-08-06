import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { CustomError } from '@/utils/error/custom.error';

let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUserRepository;

describe.only('Create User', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user with valid data', async () => {
    const userInput = {
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      password: 'password123',
    };
    const user = await createUserUseCase.execute(userInput);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe('Hugo Uraga');
    expect(user.email).toBe('hugouraga61@gmail.com');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if email is already in use', async () => {
    const userInput = {
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      password: 'password123',
    };
    await createUserUseCase.execute(userInput);

    const duplicateUserInput = {
      userName: 'Jane Doe',
      userEmail: 'hugouraga61@gmail.com',
      password: 'password456',
    };
    await expect(createUserUseCase.execute(duplicateUserInput)).rejects.toThrow(
      CustomError,
    );
  });

  it('should handle unexpected errors', async () => {
    jest
      .spyOn(userRepository, 'getByEmail')
      .mockRejectedValue(new Error('Unexpected error'));

    const userInput = {
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      password: 'password123',
    };
    await expect(createUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });
});
