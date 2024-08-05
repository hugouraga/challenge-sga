import { randomUUID } from 'crypto';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialInterface } from '@/domain/interface/tutorial-interface';
import { CustomError } from '@/utils/error/custom.error';

export class Tutorial {
  private readonly _id: string;
  private _title: string;
  private _summary: string;
  private _estimatedDuration: string;
  private _difficultyLevel: DifficultyLevel;
  private _creatorId: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _isDeleted: boolean;

  private constructor({
    id,
    title,
    summary,
    estimatedDuration,
    difficultyLevel,
    creatorId,
    createdAt,
    updatedAt,
    isDeleted,
  }: TutorialInterface) {
    this.validateTitle(title);
    this.validateEstimatedDuration(estimatedDuration);
    this.validateDifficultyLevel(difficultyLevel);
    this.validateCreatorId(creatorId);

    this._id = id;
    this._title = title;
    this._summary = summary;
    this._estimatedDuration = estimatedDuration;
    this._difficultyLevel = difficultyLevel;
    this._creatorId = creatorId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._isDeleted = isDeleted;
  }

  public static createNew(
    title: string,
    summary: string,
    estimatedDuration: string,
    difficultyLevel: DifficultyLevel,
    creatorId: string,
  ): Tutorial {
    const now = new Date();
    const id = randomUUID();
    return new Tutorial({
      id,
      title,
      summary,
      estimatedDuration,
      difficultyLevel,
      creatorId,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    });
  }

  public static fromDatabase(data: TutorialInterface): Tutorial {
    return new Tutorial(data);
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get summary(): string {
    return this._summary;
  }

  public get estimatedDuration(): string {
    return this._estimatedDuration;
  }

  public get difficultyLevel(): DifficultyLevel {
    return this._difficultyLevel;
  }

  public get creatorId(): string {
    return this._creatorId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get isDeleted(): boolean {
    return this._isDeleted;
  }

  private validateTitle(title: string): void {
    if (!title) {
      throw new CustomError('Title cannot be empty', 400);
    }
  }

  private validateEstimatedDuration(estimatedDuration: string): void {
    if (!estimatedDuration) {
      throw new CustomError('Estimated duration cannot be empty', 400);
    }
  }

  private validateDifficultyLevel(difficultyLevel: DifficultyLevel): void {
    if (!difficultyLevel) {
      throw new CustomError('Difficulty level cannot be empty', 400);
    }
  }

  private validateCreatorId(creatorId: string): void {
    if (!creatorId) {
      throw new CustomError('Creator ID cannot be empty', 400);
    }
  }
  public update(updatedTutorial: Partial<Tutorial>): void {
    if (updatedTutorial.title !== undefined) {
      this.validateTitle(updatedTutorial.title);
      this.updateTitle(updatedTutorial.title);
    }
    if (updatedTutorial.summary !== undefined)
      this.updateSummary(updatedTutorial.summary);
    if (updatedTutorial.estimatedDuration !== undefined) {
      this.validateEstimatedDuration(updatedTutorial.estimatedDuration);
      this.updateEstimatedDuration(updatedTutorial.estimatedDuration);
    }
    if (updatedTutorial.difficultyLevel !== undefined) {
      this.validateDifficultyLevel(updatedTutorial.difficultyLevel);
      this.updateDifficultyLevel(updatedTutorial.difficultyLevel);
    }
    if (updatedTutorial.creatorId !== undefined) {
      this.validateCreatorId(updatedTutorial.creatorId);
      this.updateCreatorId(updatedTutorial.creatorId);
    }
  }

  private updateTitle(title: string): void {
    this._title = title;
    this._updatedAt = new Date();
  }

  private updateSummary(summary: string): void {
    this._summary = summary;
    this._updatedAt = new Date();
  }

  private updateEstimatedDuration(estimatedDuration: string): void {
    this._estimatedDuration = estimatedDuration;
    this._updatedAt = new Date();
  }

  private updateDifficultyLevel(difficultyLevel: DifficultyLevel): void {
    this._difficultyLevel = difficultyLevel;
    this._updatedAt = new Date();
  }

  private updateCreatorId(creatorId: string): void {
    this._creatorId = creatorId;
    this._updatedAt = new Date();
  }

  public markAsDeleted(): void {
    this._isDeleted = true;
    this._updatedAt = new Date();
  }
}
