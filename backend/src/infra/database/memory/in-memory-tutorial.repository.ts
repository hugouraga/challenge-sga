import { Injectable } from '@nestjs/common';

import {
  TutorialFilter,
  TutorialRepository,
  TutorialPagination,
} from '@/domain/repository/tutorial.repository';
import { Tutorial } from '@/domain/entity/tutorial.entity';

@Injectable()
export class InMemoryTutorialRepository implements TutorialRepository {
  private tutorialList: Tutorial[] = [];

  async getAll(
    filters: TutorialFilter,
    pagination: TutorialPagination,
  ): Promise<Tutorial[]> {
    const filteredTutorials = this.applyFilters(this.tutorialList, filters);
    return this.applyPagination(filteredTutorials, pagination);
  }

  async getById(id: string): Promise<Tutorial> {
    const tutorial = this.tutorialList.find((tutorial) => tutorial.id === id);

    if (!tutorial) throw new Error('Tutorial not found');
    return tutorial;
  }

  async getByUserId(userId: string): Promise<Tutorial[]> {
    return this.tutorialList.filter(
      (tutorial) => tutorial.creatorId === userId,
    );
  }

  async create(tutorial: Tutorial): Promise<Tutorial> {
    this.tutorialList.push(tutorial);
    return tutorial;
  }

  async update(
    id: string,
    updatedTutorial: Partial<Tutorial>,
  ): Promise<Tutorial> {
    const index = this.tutorialList.findIndex((tutorial) => tutorial.id === id);
    if (index === -1) throw new Error('Tutorial not found');

    const currentTutorial = this.tutorialList[index];
    currentTutorial.update(updatedTutorial);

    this.tutorialList[index] = currentTutorial;
    return currentTutorial;
  }

  async delete(id: string): Promise<void> {
    const index = this.tutorialList.findIndex((tutorial) => tutorial.id === id);
    if (index === -1) throw new Error('Tutorial not found');
    this.tutorialList.splice(index, 1);
  }

  private applyFilters(
    tutorialList: Tutorial[],
    filters: TutorialFilter,
  ): Tutorial[] {
    let filteredTutorials = tutorialList;
    if (filters.title) {
      filteredTutorials = filteredTutorials.filter((tutorial) =>
        tutorial.title.includes(filters.title),
      );
    }
    if (filters.summary) {
      filteredTutorials = filteredTutorials.filter((tutorial) =>
        tutorial.summary.includes(filters.summary),
      );
    }
    if (filters.creatorId) {
      filteredTutorials = filteredTutorials.filter(
        (tutorial) => tutorial.creatorId === filters.creatorId,
      );
    }
    if (filters.difficultyLevel) {
      filteredTutorials = filteredTutorials.filter(
        (tutorial) => tutorial.difficultyLevel === filters.difficultyLevel,
      );
    }
    if (filters.tags && filters.tags.length > 0) {
      filteredTutorials = filteredTutorials.filter((tutorial) =>
        filters.tags.some((tag) => tutorial.tags.includes(tag)),
      );
    }
    return filteredTutorials;
  }

  private applyPagination(
    tutorialList: Tutorial[],
    pagination: TutorialPagination,
  ): Tutorial[] {
    const start = pagination.offset;
    const end = start + pagination.limit;
    return tutorialList.slice(start, end);
  }
}
