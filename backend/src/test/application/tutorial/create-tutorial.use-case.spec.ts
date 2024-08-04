import { CreateTutorialUseCase } from '@/application/use-cases/tutorial/create-tutorial.use-case';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { InMemoryUserRepository } from '@/infra/database/memory/in-memory-user-repository';
import { User } from '@/domain/entity/user.entity';
import { CustomError } from '@/utils/error/custom.error';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

let createTutorialUseCase: CreateTutorialUseCase;
let tutorialRepository: InMemoryTutorialRepository;
let userRepository: InMemoryUserRepository;

describe.only('Create Tutorial', () => {
  beforeEach(async () => {
    tutorialRepository = new InMemoryTutorialRepository();
    userRepository = new InMemoryUserRepository();
    createTutorialUseCase = new CreateTutorialUseCase(
      tutorialRepository,
      userRepository,
    );
  });

  it('should create a tutorial with valid data', async () => {
    const user = await User.createNew(
      'Hugo Uraga',
      'hugouraga61@gmail.com',
      '12345678',
    );
    await userRepository.create(user);

    const tutorialInput = {
      title: 'New Tutorial',
      summary: 'This is a new tutorial',
      estimatedDuration: '2 hours',
      requirements: ['Node.js', 'TypeScript'],
      difficultyLevel: DifficultyLevel.Beginner,
      tags: ['node', 'typescript'],
      creatorId: user.id,
    };

    const createdTutorial = await createTutorialUseCase.execute(tutorialInput);

    expect(createdTutorial).toBeDefined();
    expect(createdTutorial.title).toBe(tutorialInput.title);
    expect(createdTutorial.summary).toBe(tutorialInput.summary);
    expect(createdTutorial.estimatedDuration).toBe(
      tutorialInput.estimatedDuration,
    );
    expect(createdTutorial.requirements).toEqual(tutorialInput.requirements);
    expect(createdTutorial.difficultyLevel).toBe(tutorialInput.difficultyLevel);
    expect(createdTutorial.tags).toEqual(tutorialInput.tags);
    expect(createdTutorial.creatorId).toBe(tutorialInput.creatorId);
    expect(createdTutorial.createdAt).toBeInstanceOf(Date);
    expect(createdTutorial.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if creator is not found', async () => {
    const tutorialInput = {
      title: 'New Tutorial',
      summary: 'This is a new tutorial',
      estimatedDuration: '2 hours',
      requirements: ['Node.js', 'TypeScript'],
      difficultyLevel: DifficultyLevel.Beginner,
      tags: ['node', 'typescript'],
      creatorId: 'nonexistent-id',
    };

    await expect(createTutorialUseCase.execute(tutorialInput)).rejects.toThrow(
      CustomError,
    );
  });
});
