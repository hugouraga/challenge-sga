import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserOrm } from './user.orm-entity';
import { Tutorial as DomainTutorial } from '@/domain/entity/tutorial.entity';
import { DifficultyLevel } from '@/utils/enum/difiiculty-level-enum';
import { v4 as uuidv4 } from 'uuid';

@Entity('tutorials')
export class TutorialOrm {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  estimatedDuration: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
  })
  difficultyLevel: DifficultyLevel;

  @Column('varchar', { length: 36 })
  creatorId: string;

  @ManyToOne(() => UserOrm, (user) => user.tutorials, { eager: true })
  @JoinColumn({ name: 'creatorId' })
  creator: UserOrm;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): DomainTutorial {
    return DomainTutorial.fromDatabase({
      id: this.id,
      title: this.title,
      summary: this.summary,
      estimatedDuration: this.estimatedDuration,
      difficultyLevel: this.difficultyLevel,
      creatorId: this.creatorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: false,
    });
  }

  static fromDomain(
    domainTutorial: DomainTutorial,
    creatorId: string,
  ): TutorialOrm {
    const tutorialOrm = new TutorialOrm();
    tutorialOrm.id = domainTutorial.id;
    tutorialOrm.title = domainTutorial.title;
    tutorialOrm.summary = domainTutorial.summary;
    tutorialOrm.estimatedDuration = domainTutorial.estimatedDuration;

    tutorialOrm.difficultyLevel = domainTutorial.difficultyLevel;
    tutorialOrm.creatorId = creatorId;
    tutorialOrm.createdAt = domainTutorial.createdAt;
    tutorialOrm.updatedAt = domainTutorial.updatedAt;
    return tutorialOrm;
  }
}
