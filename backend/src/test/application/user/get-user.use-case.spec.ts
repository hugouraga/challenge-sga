import { GetUserUseCase } from '@/application/user/get-user.use-case';
import { User } from '@/domain/entity/user.entity';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { CustomError } from '@/utils/error/custom.error';

let getUserUseCase: GetUserUseCase;
let userRepository: InMemoryUserRepository;

describe.only('Get User', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    getUserUseCase = new GetUserUseCase(userRepository);
  });

  it('should return a user with valid ID', async () => {
    const user = await User.createNew(
      'Hugo uraga',
      'hugouraga61@gmail.com',
      'password123',
    );
    await userRepository.create(user);

    const foundUser = await getUserUseCase.execute(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
    expect(foundUser.name).toBe('Hugo uraga');
    expect(foundUser.email).toBe('hugouraga61@gmail.com');
  });

  it('should throw an error if user is not found', async () => {
    await expect(getUserUseCase.execute('nonexistent-id')).rejects.toThrow(
      CustomError,
    );
  });
});
