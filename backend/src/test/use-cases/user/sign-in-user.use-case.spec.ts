import { SignInUserUseCase } from '@/application/use-cases/user/sign-in-user.use-case';
import { User } from '@/domain/entity/user.entity';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { CustomError } from '@/utils/error/custom.error';

let signInUserUseCase: SignInUserUseCase;
let userRepository: InMemoryUserRepository;

describe.only('Sign In User', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    signInUserUseCase = new SignInUserUseCase(userRepository);
  });

  it('should sign in a user with valid credentials', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const userInput = {
      userEmail: 'hugouraga61@gmail.com',
      userPassword: '12345678',
    };
    const signedInUser = await signInUserUseCase.execute(userInput);
    expect(signedInUser).toBeDefined();
    expect(signedInUser.email).toBe('hugouraga61@gmail.com');
  });

  it('should throw an error if email is not found', async () => {
    const userInput = {
      userEmail: 'nonexistent@example.com',
      userPassword: 'password123',
    };
    await expect(signInUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });

  it('should throw an error if password is incorrect', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const userInput = {
      userEmail: 'hugouraga61@gmail.com',
      userPassword: 'wrongpassword',
    };
    await expect(signInUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });

  it('should throw an error if email is incorrect', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const userInput = { userEmail: 'hugo@gmail.com', userPassword: '12345678' };
    await expect(signInUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });
});
