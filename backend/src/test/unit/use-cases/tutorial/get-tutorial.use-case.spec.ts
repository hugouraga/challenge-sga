import { GetTutorialUseCase } from '@/application/use-cases/tutorial/get-tutorial-id.use-case';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { User } from '@/domain/entity/user.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { Tutorial } from '@/domain/entity/tutorial.entity';

let getTutorialUseCase: GetTutorialUseCase;
let tutorialRepository: InMemoryTutorialRepository;
let userRepository: InMemoryUserRepository;

describe.only('Get Tutorial', () => {
  beforeEach(async () => {
    tutorialRepository = new InMemoryTutorialRepository();
    userRepository = new InMemoryUserRepository();
    getTutorialUseCase = new GetTutorialUseCase(tutorialRepository);
  });

  it('should return a tutorial with valid ID', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const tutorial = Tutorial.createNew(
      'Original Title',
      'Original Summary',
      '2 hours',
      DifficultyLevel.Beginner,
      user.id,
    );
    await tutorialRepository.create(tutorial);

    const tutorialInput = { tutorialId: tutorial.id };
    const foundTutorial = await getTutorialUseCase.execute(tutorialInput);

    expect(foundTutorial).toBeDefined();
    expect(foundTutorial.id).toBe(tutorial.id);
    expect(foundTutorial.title).toBe(tutorial.title);
    expect(foundTutorial.summary).toBe(tutorial.summary);
    expect(foundTutorial.estimatedDuration).toBe(tutorial.estimatedDuration);
    expect(foundTutorial.difficultyLevel).toBe(tutorial.difficultyLevel);
    expect(foundTutorial.creatorId).toBe(tutorial.creatorId);
    expect(foundTutorial.createdAt).toBeInstanceOf(Date);
    expect(foundTutorial.updatedAt).toBeInstanceOf(Date);
    expect(foundTutorial.isDeleted).toBe(false);
  });

  it('should throw an error if tutorial is not found', async () => {
    const tutorialInput = { tutorialId: 'nonexistent-id' };

    await expect(getTutorialUseCase.execute(tutorialInput)).rejects.toThrow(
      Error,
    );
  });
});
