import { randomUUID } from 'crypto';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { TutorialInterface } from '@/domain/interface/tutorial-interface';

export class Tutorial {
  private readonly _id: string;
  private _title: string;
  private _summary: string;
  private _estimatedDuration: string;
  private _requirements: string[];
  private _difficultyLevel: DifficultyLevel;
  private _tags: string[];
  private _creatorId: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _isDeleted: boolean;

  private constructor({
    id,
    title,
    summary,
    estimatedDuration,
    requirements,
    difficultyLevel,
    tags,
    creatorId,
    createdAt,
    updatedAt,
    isDeleted,
  }: TutorialInterface) {
    this._id = id;
    this._title = title;
    this._summary = summary;
    this._estimatedDuration = estimatedDuration;
    this._requirements = requirements;
    this._difficultyLevel = difficultyLevel;
    this._tags = tags;
    this._creatorId = creatorId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._isDeleted = isDeleted;
  }

  public static createNew(
    title: string,
    summary: string,
    estimatedDuration: string,
    requirements: string[],
    difficultyLevel: DifficultyLevel,
    tags: string[],
    creatorId: string,
  ): Tutorial {
    const now = new Date();
    const id = randomUUID();
    return new Tutorial({
      id,
      title,
      summary,
      estimatedDuration,
      requirements,
      difficultyLevel,
      tags,
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

  public get requirements(): string[] {
    return this._requirements;
  }

  public get difficultyLevel(): DifficultyLevel {
    return this._difficultyLevel;
  }

  public get tags(): string[] {
    return this._tags;
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

  private updateRequirements(requirements: string[]): void {
    this._requirements = requirements;
    this._updatedAt = new Date();
  }

  private updateDifficultyLevel(difficultyLevel: DifficultyLevel): void {
    this._difficultyLevel = difficultyLevel;
    this._updatedAt = new Date();
  }

  private updateTags(tags: string[]): void {
    this._tags = tags;
    this._updatedAt = new Date();
  }

  public update(updatedTutorial: Partial<Tutorial>): void {
    if (updatedTutorial.title !== undefined)
      this.updateTitle(updatedTutorial.title);
    if (updatedTutorial.summary !== undefined)
      this.updateSummary(updatedTutorial.summary);
    if (updatedTutorial.estimatedDuration !== undefined)
      this.updateEstimatedDuration(updatedTutorial.estimatedDuration);
    if (updatedTutorial.requirements !== undefined)
      this.updateRequirements(updatedTutorial.requirements);
    if (updatedTutorial.difficultyLevel !== undefined)
      this.updateDifficultyLevel(updatedTutorial.difficultyLevel);
    if (updatedTutorial.tags !== undefined)
      this.updateTags(updatedTutorial.tags);
  }

  public markAsDeleted(): void {
    this._isDeleted = true;
    this._updatedAt = new Date();
  }
}
