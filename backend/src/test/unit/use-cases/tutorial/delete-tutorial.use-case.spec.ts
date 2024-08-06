import { DeleteTutorialUseCase } from '@/application/use-cases/tutorial/delete-tutorial.use-case';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { User } from '@/domain/entity/user.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { Tutorial } from '@/domain/entity/tutorial.entity';

let deleteTutorialUseCase: DeleteTutorialUseCase;
let tutorialRepository: InMemoryTutorialRepository;
let userRepository: InMemoryUserRepository;

describe.only('Delete Tutorial', () => {
  beforeEach(async () => {
    tutorialRepository = new InMemoryTutorialRepository();
    userRepository = new InMemoryUserRepository();
    deleteTutorialUseCase = new DeleteTutorialUseCase(tutorialRepository);
  });

  it('should mark a tutorial as deleted with valid ID', async () => {
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
    await deleteTutorialUseCase.execute(tutorialInput);

    await expect(tutorialRepository.getById(tutorial.id)).rejects.toThrow(
      Error,
    );
  });

  it('should throw an error if tutorial is not found', async () => {
    const tutorialInput = { tutorialId: 'nonexistent-id' };

    await expect(deleteTutorialUseCase.execute(tutorialInput)).rejects.toThrow(
      Error,
    );
  });
});
