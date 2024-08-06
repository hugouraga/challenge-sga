import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutorial as DomainTutorial } from '@/domain/entity/tutorial.entity';
import {
  TutorialFilter,
  TutorialPagination,
  TutorialRepository,
} from '@/domain/repository/tutorial.repository';
import { TutorialOrm } from '../entity/tutorial.orm-entity';
import { UserOrm } from '../entity/user.orm-entity';

@Injectable()
export class TypeOrmTutorialRepository implements TutorialRepository {
  constructor(
    @InjectRepository(TutorialOrm)
    private readonly tutorialRepository: Repository<TutorialOrm>,
    @InjectRepository(UserOrm)
    private readonly userRepository: Repository<UserOrm>,
  ) {}

  async getAll(
    filters: TutorialFilter,
    pagination: TutorialPagination,
  ): Promise<DomainTutorial[]> {
    const query = this.tutorialRepository.createQueryBuilder('tutorial');

    if (filters.title) {
      query.andWhere('tutorial.title LIKE :title', {
        title: `%${filters.title}%`,
      });
    }
    if (filters.summary) {
      query.andWhere('tutorial.summary LIKE :summary', {
        summary: `%${filters.summary}%`,
      });
    }
    if (filters.creatorId) {
      query.andWhere('tutorial.creatorId = :creatorId', {
        creatorId: filters.creatorId,
      });
    }
    if (filters.difficultyLevel) {
      query.andWhere('tutorial.difficultyLevel = :difficultyLevel', {
        difficultyLevel: filters.difficultyLevel,
      });
    }
    if (filters.tags && filters.tags.length > 0) {
      query.andWhere('tutorial.tags && ARRAY[:...tags]', {
        tags: filters.tags,
      });
    }

    query.skip(pagination.offset).take(pagination.limit);

    const tutorials = await query.getMany();
    return tutorials.map((tutorial) => tutorial.toDomain());
  }

  async getById(id: string): Promise<DomainTutorial> {
    const tutorial = await this.tutorialRepository.findOne({ where: { id } });
    return tutorial?.toDomain();
  }

  async getByUserId(userId: string): Promise<DomainTutorial[]> {
    const tutorials = await this.tutorialRepository.find({
      where: { creator_id: userId },
    });
    return tutorials.map((tutorial) => tutorial.toDomain());
  }

  async create(domainTutorial: DomainTutorial): Promise<DomainTutorial> {
    const creator = await this.userRepository.findOne({
      where: { id: domainTutorial.creatorId },
    });
    if (!creator) {
      throw new Error('Creator not found');
    }
    const tutorial = this.tutorialRepository.create(
      TutorialOrm.fromDomain(domainTutorial, creator.id),
    );
    const savedTutorial = await this.tutorialRepository.save(tutorial);
    return savedTutorial.toDomain();
  }

  async update(
    id: string,
    updatedTutorial: Partial<DomainTutorial>,
  ): Promise<DomainTutorial> {
    await this.tutorialRepository.update(id, updatedTutorial);
    const tutorial = await this.getById(id);
    return tutorial;
  }

  async delete(id: string): Promise<void> {
    await this.tutorialRepository.softDelete(id);
  }
}
