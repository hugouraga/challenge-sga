import { InMemoryTutorialRepository } from '../../infra/database/memory/in-memory-tutorial.repository';
import { Tutorial } from '../../domain/entity/tutorial.entity';
import { DifficultyLevel } from '../../domain/interface/difiiculty-level-enum';

describe('InMemoryTutorialRepository', () => {
  let inMemoryTutorialRepository: InMemoryTutorialRepository;
  let tutorial: Tutorial;

  beforeEach(() => {
    inMemoryTutorialRepository = new InMemoryTutorialRepository();
    tutorial = Tutorial.createNew(
      'Backend - Node',
      'Summary 1',
      '30 minutes',
      ['Javascript'],
      DifficultyLevel.Beginner,
      ['JS'],
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
    expect(created.requirements).toEqual(['Javascript']);
    expect(created.difficultyLevel).toEqual(DifficultyLevel.Beginner);
    expect(created.tags).toEqual(['JS']);
    expect(created.creatorId).toEqual('Creator 1');
    expect(created.isDeleted).toEqual(false);
  });

  it('should update a tutorial', async () => {
    await inMemoryTutorialRepository.create(tutorial);

    const updatedPartial: Partial<Tutorial> = {
      title: 'Updated Title',
      summary: 'Updated Summary',
      estimatedDuration: '45 minutes',
      requirements: ['Updated Requirement 1'],
      difficultyLevel: DifficultyLevel.Intermediate,
      tags: ['Updated Tag1'],
    };
    await inMemoryTutorialRepository.update(tutorial.id, updatedPartial);
    const updated = await inMemoryTutorialRepository.getById(tutorial.id);

    expect(updated.title).toEqual(updatedPartial.title);
    expect(updated.summary).toEqual(updatedPartial.summary);
    expect(updated.estimatedDuration).toEqual(updatedPartial.estimatedDuration);
    expect(updated.requirements).toEqual(updatedPartial.requirements);
    expect(updated.difficultyLevel).toEqual(updatedPartial.difficultyLevel);
    expect(updated.tags).toEqual(updatedPartial.tags);
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
      ['Requirement A'],
      DifficultyLevel.Intermediate,
      ['Tag2'],
      'Creator 2',
    );
    await inMemoryTutorialRepository.create(tutorial);
    await inMemoryTutorialRepository.create(tutorial2);

    const tutorials = await inMemoryTutorialRepository.getAll(
      {},
      { limit: 1, offset: 0 },
    );
    expect(tutorials).toHaveLength(1);
    expect(tutorials[0]).toEqual(tutorial);

    const filteredTutorials = await inMemoryTutorialRepository.getAll(
      { creatorId: 'Creator 2' },
      { limit: 1, offset: 0 },
    );
    expect(filteredTutorials).toHaveLength(1);
    expect(filteredTutorials[0]).toEqual(tutorial2);
  });
});
