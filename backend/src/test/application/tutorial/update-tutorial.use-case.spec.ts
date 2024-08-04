import { UpdateTutorialUseCase } from '@/application/tutorial/update-tutorial.use-case';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { User } from '@/domain/entity/user.entity';
import { Tutorial } from '@/domain/entity/tutorial.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

let updateTutorialUseCase: UpdateTutorialUseCase;
let tutorialRepository: InMemoryTutorialRepository;
let userRepository: InMemoryUserRepository;

describe.only('Update Tutorial', () => {
  beforeEach(async () => {
    tutorialRepository = new InMemoryTutorialRepository();
    userRepository = new InMemoryUserRepository();
    updateTutorialUseCase = new UpdateTutorialUseCase(tutorialRepository);
  });

  it('should update a tutorial with valid data', async () => {
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
      ['Node.js', 'TypeScript'],
      DifficultyLevel.Beginner,
      ['node', 'typescript'],
      user.id,
    );
    await tutorialRepository.create(tutorial);

    const tutorialInput = {
      tutorialId: tutorial.id,
      title: 'Updated Title',
      summary: 'Updated Summary',
      estimatedDuration: '3 hours',
    };

    const updatedTutorial = await updateTutorialUseCase.execute(tutorialInput);

    expect(updatedTutorial).toBeDefined();
    expect(updatedTutorial.title).toBe(tutorialInput.title);
    expect(updatedTutorial.summary).toBe(tutorialInput.summary);
    expect(updatedTutorial.estimatedDuration).toBe(
      tutorialInput.estimatedDuration,
    );
    expect(updatedTutorial.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if tutorial is not found', async () => {
    const tutorialInput = {
      tutorialId: 'nonexistent-id',
      title: 'Updated Title',
    };

    await expect(updateTutorialUseCase.execute(tutorialInput)).rejects.toThrow(
      Error,
    );
  });
});
