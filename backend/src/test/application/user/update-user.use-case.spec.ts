import { UpdateUserUseCase } from '@/application/user/update-user.use-case';
import { User } from '@/domain/entity/user.entity';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { CustomError } from '@/utils/error/custom.error';

describe.only('Update User', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });

  it('should update a user with valid data', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const updatedUser = await updateUserUseCase.execute({
      userId: user.id,
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      userPassword: 'newpassword123',
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Hugo Uraga');
    expect(updatedUser.email).toBe('hugouraga61@gmail.com');
    expect(updatedUser.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if user is not found', async () => {
    const userInput = {
      userId: 'nonexistent-id',
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      userPassword: 'newpassword123',
    };
    await expect(updateUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });

  it('should throw an error if email is already in use by another user', async () => {
    const user1 = await User.createNew(
      'Hugo Uraga',
      'hugouraga@gmail.com',
      'newpassword123',
    );
    const user2 = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      'newpassword123',
    );
    await userRepository.create(user1);
    await userRepository.create(user2);

    const userInput = {
      userId: user1.id,
      userName: 'Hugo Uraga',
      userEmail: 'hugouraga61@gmail.com',
      userPassword: 'newpassword123',
    };
    await expect(updateUserUseCase.execute(userInput)).rejects.toThrow(
      CustomError,
    );
  });
});
