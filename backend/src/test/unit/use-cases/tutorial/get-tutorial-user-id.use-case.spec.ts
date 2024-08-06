import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { User } from '@/domain/entity/user.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { Tutorial } from '@/domain/entity/tutorial.entity';

let tutorialRepository: InMemoryTutorialRepository;
let userRepository: InMemoryUserRepository;

describe.only('Get Tutorial', () => {
  beforeEach(async () => {
    tutorialRepository = new InMemoryTutorialRepository();
    userRepository = new InMemoryUserRepository();
  });

  it('should return all tutorials for a specific user', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const tutorial1 = Tutorial.createNew(
      'Original Title',
      'Original Summary',
      '2 hours',
      DifficultyLevel.Beginner,
      user.id,
    );
    const tutorial2 = Tutorial.createNew(
      'Original Title 2',
      'Original Summary',
      '2 hours',
      DifficultyLevel.Beginner,
      user.id,
    );
    const tutorial3 = Tutorial.createNew(
      'Original Title 3',
      'Original Summary',
      '2 hours',
      DifficultyLevel.Beginner,
      user.id,
    );

    await tutorialRepository.create(tutorial1);
    await tutorialRepository.create(tutorial2);
    await tutorialRepository.create(tutorial3);

    const userTutorials = await tutorialRepository.getByUserId(user.id);

    expect(userTutorials).toHaveLength(3);
    expect(userTutorials[0].title).toBe('Original Title');
    expect(userTutorials[1].title).toBe('Original Title 2');
  });

  it('should return an empty array if no tutorials are found for the user', async () => {
    const userTutorials =
      await tutorialRepository.getByUserId('nonexistent-user');
    expect(userTutorials).toHaveLength(0);
  });
});
