import { CreateUserUseCase } from '@/application/user/create-user.use-case';
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
    const user = await createUserUseCase.execute(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      'password123',
    );
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe('Hugo Uraga');
    expect(user.email).toBe('hugouraga61@gmail.com');
    expect(user.password).not.toBe('password123');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if email is already in use', async () => {
    await createUserUseCase.execute(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      'password123',
    );
    await expect(
      createUserUseCase.execute(
        'Jane Doe',
        'hugouraga61@gmail.com',
        'password456',
      ),
    ).rejects.toThrow(CustomError);
  });

  it('should handle unexpected errors', async () => {
    jest
      .spyOn(userRepository, 'getByEmail')
      .mockRejectedValue(new Error('Unexpected error'));
    await expect(
      createUserUseCase.execute(
        'Hugo Uraga',
        'hugouraga61@gmail.com',
        'password123',
      ),
    ).rejects.toThrow(CustomError);
  });
});
