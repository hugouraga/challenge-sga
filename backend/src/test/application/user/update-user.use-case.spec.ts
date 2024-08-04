import { UpdateUserUseCase } from '@/application/user/update-user.use-case';
import { User } from '@/domain/entity/user.entity';
import { UserRepository } from '@/domain/repository/user.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { CustomError } from '@/utils/error/custom.error';

describe('Update User', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });

  it('should update a user with valid data', async () => {
    const user = await User.createNew(
      'hugo uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const updatedUser = await updateUserUseCase.execute(
      user.id,
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      'newpassword123',
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Hugo Uraga');
    expect(updatedUser.email).toBe('hugouraga61@gmail.com');
    expect(updatedUser.password).not.toBe('newpassword123');
    expect(updatedUser.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if user is not found', async () => {
    await expect(
      updateUserUseCase.execute(
        'nonexistent-id',
        'Hugo Uraga',
        'hugouraga61@gmail.com',
        'newpassword123',
      ),
    ).rejects.toThrow(CustomError);
  });

  it('should throw an error if email is already in use by another user', async () => {
    const user1 = await User.createNew(
      'hugo uraga',
      'hugouraga@gmail.com',
      'newpassword123',
    );
    const user2 = await User.createNew(
      'hugo uraga',
      'hugouraga61@gmail.com',
      'newpassword123',
    );
    await userRepository.create(user1);
    await userRepository.create(user2);

    await expect(
      updateUserUseCase.execute(
        user1.id,
        'hugo uraga',
        'hugouraga61@gmail.com',
        'newpassword123',
      ),
    ).rejects.toThrow(CustomError);
  });
});
