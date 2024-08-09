import { Tutorial } from '@/domain/entity/tutorial.entity';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';

describe('Tutorial Entity', () => {
  let inMemoryTutorialRepository: InMemoryTutorialRepository;
  let tutorial: Tutorial;

  beforeEach(() => {
    inMemoryTutorialRepository = new InMemoryTutorialRepository();
    tutorial = Tutorial.createNew(
      'Backend - Node',
      'Summary 1',
      '30 minutes',
      DifficultyLevel.Beginner,
      'Creator 1',
    );
  });

  it('should create a tutorial', async () => {
    await inMemoryTutorialRepository.create(tutorial);
    const created = await inMemoryTutorialRepository.getById(tutorial.id);
    expect(created.id).toEqual(tutorial.id);
    expect(created.title).toEqual('Backend - Node');
    expect(created.summary).toEqual('Summary 1');
    expect(created.estimatedDuration).toEqual('30 minutes');
    expect(created.difficultyLevel).toEqual(DifficultyLevel.Beginner);
    expect(created.creatorId).toEqual('Creator 1');
    expect(created.isDeleted).toEqual(false);
  });

  it('should update a tutorial', async () => {
    await inMemoryTutorialRepository.create(tutorial);

    const updatedPartial: Partial<Tutorial> = {
      title: 'Updated Title',
      summary: 'Updated Summary',
      estimatedDuration: '45 minutes',
      difficultyLevel: DifficultyLevel.Intermediate,
    };
    await inMemoryTutorialRepository.update(tutorial.id, updatedPartial);
    const updated = await inMemoryTutorialRepository.getById(tutorial.id);

    expect(updated.title).toEqual(updatedPartial.title);
    expect(updated.summary).toEqual(updatedPartial.summary);
    expect(updated.estimatedDuration).toEqual(updatedPartial.estimatedDuration);
    expect(updated.difficultyLevel).toEqual(updatedPartial.difficultyLevel);
  });

  it('should delete a tutorial', async () => {
    await inMemoryTutorialRepository.create(tutorial);
    await inMemoryTutorialRepository.delete(tutorial.id);
    await expect(
      inMemoryTutorialRepository.getById(tutorial.id),
    ).rejects.toThrow('Tutorial not found');
  });

  it('should list tutorials with filters and pagination', async () => {
    const tutorial2 = Tutorial.createNew(
      'Title 2',
      'Summary 2',
      '40 minutes',
      DifficultyLevel.Intermediate,
      'Creator 2',
    );
    await inMemoryTutorialRepository.create(tutorial);
    await inMemoryTutorialRepository.create(tutorial2);

    const tutorials = await inMemoryTutorialRepository.getAll(
      '',
      {},
      { limit: 1, offset: 0 },
    );
    expect(tutorials).toHaveLength(1);
    expect(tutorials[0]).toEqual(tutorial);

    const filteredTutorials = await inMemoryTutorialRepository.getAll(
      '',
      { creatorId: 'Creator 2' },
      { limit: 1, offset: 0 },
    );
    expect(filteredTutorials).toHaveLength(1);
    expect(filteredTutorials[0]).toEqual(tutorial2);
  });
});
