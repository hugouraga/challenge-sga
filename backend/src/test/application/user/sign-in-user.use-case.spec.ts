import { SignInUserUseCase } from '@/application/user/sign-in-user.use-case';
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
      'hugo uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const signedInUser = await signInUserUseCase.execute(
      'hugouraga61@gmail.com',
      '12345678',
    );
    expect(signedInUser).toBeDefined();
    expect(signedInUser.email).toBe('hugouraga61@gmail.com');
  });

  it('should throw an error if email is not found', async () => {
    await expect(
      signInUserUseCase.execute('nonexistent@example.com', 'password123'),
    ).rejects.toThrow(CustomError);
  });

  it('should throw an error if password is incorrect', async () => {
    const user = await User.createNew(
      'hugo uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    await expect(
      signInUserUseCase.execute('hugouraga61@gmail.com', 'wrongpassword'),
    ).rejects.toThrow(CustomError);
  });

  it('should throw an error if email is incorrect', async () => {
    const user = await User.createNew(
      'hugo uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    await expect(
      signInUserUseCase.execute('hugo@gmail.com', 'wrongpassword'),
    ).rejects.toThrow(CustomError);
  });
});
