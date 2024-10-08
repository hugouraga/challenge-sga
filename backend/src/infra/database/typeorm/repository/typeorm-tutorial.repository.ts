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
    filters?: TutorialFilter,
    pagination?: TutorialPagination,
  ): Promise<DomainTutorial[]> {
    const query = this.tutorialRepository.createQueryBuilder('tutorial');
    if (filters) {
      if (filters.title) {
        query.andWhere('tutorial.title LIKE :title', {
          title: `%${filters.title}%`,
        });
      }
      if (filters.duration) {
        query.andWhere('tutorial.estimated_duration LIKE :estimatedDuration', {
          estimatedDuration: `%${filters.duration}%`,
        });
      }
      if (filters.summary) {
        query.andWhere('tutorial.summary LIKE :summary', {
          summary: `%${filters.summary}%`,
        });
      }
      if (filters.creatorId) {
        query.andWhere('tutorial.creator_id = :creatorId', {
          creatorId: filters.creatorId,
        });
      }
      if (filters.difficultyLevel) {
        query.andWhere('tutorial.difficulty_level = :difficultyLevel', {
          difficultyLevel: filters.difficultyLevel,
        });
      }
      if (filters.tags && filters.tags.length > 0) {
        query.andWhere('tutorial.tags @> :tags', {
          tags: filters.tags,
        });
      }
    }
    if (pagination) {
      query.skip(pagination.offset).take(pagination.limit);
    }

    const tutorials = await query.getMany();
    return tutorials.map((tutorial) => tutorial.toDomain());
  }

  async count(filters?: TutorialFilter): Promise<number> {
    const query = this.tutorialRepository.createQueryBuilder('tutorial');

    if (filters) {
      if (filters.title) {
        query.andWhere('tutorial.title LIKE :title', {
          title: `%${filters.title}%`,
        });
      }
      if (filters.duration) {
        query.andWhere('tutorial.estimated_duration LIKE :estimatedDuration', {
          estimatedDuration: `%${filters.duration}%`,
        });
      }
      if (filters.summary) {
        query.andWhere('tutorial.summary LIKE :summary', {
          summary: `%${filters.summary}%`,
        });
      }
      if (filters.difficultyLevel) {
        query.andWhere('tutorial.difficulty_level = :difficultyLevel', {
          difficultyLevel: filters.difficultyLevel,
        });
      }
    }

    return query.getCount();
  }

  async getById(id: string): Promise<DomainTutorial> {
    const tutorial = await this.tutorialRepository.findOne({
      where: { id, is_deleted: false },
    });
    return tutorial?.toDomain();
  }

  async getByUserId(userId: string): Promise<DomainTutorial[]> {
    const tutorials = await this.tutorialRepository.find({
      where: { creator_id: userId, is_deleted: false },
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
    const tutorialOrm = await this.tutorialRepository.findOne({
      where: { id },
    });

    if (!tutorialOrm) {
      throw new Error('Tutorial not found');
    }

    Object.assign(tutorialOrm, {
      title: updatedTutorial.title,
      summary: updatedTutorial.summary,
      creator_id: updatedTutorial.creatorId,
      difficulty_level: updatedTutorial.difficultyLevel,
      updated_at: updatedTutorial.updatedAt,
      estimated_duration: updatedTutorial.estimatedDuration,
      is_deleted: updatedTutorial.isDeleted,
    });

    await this.tutorialRepository.update(id, tutorialOrm);
    const tutorial = await this.getById(id);
    return tutorial;
  }

  async delete(id: string): Promise<void> {
    await this.tutorialRepository.delete(id);
  }
}
