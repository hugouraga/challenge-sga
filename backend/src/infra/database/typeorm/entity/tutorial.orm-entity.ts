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
  estimated_duration: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
  })
  difficulty_level: DifficultyLevel;

  @Column('varchar', { length: 36 })
  creator_id: string;

  @ManyToOne(() => UserOrm, (user) => user.tutorials, { eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: UserOrm;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toDomain(): DomainTutorial {
    return DomainTutorial.fromDatabase({
      id: this.id,
      title: this.title,
      summary: this.summary,
      estimatedDuration: this.estimated_duration,
      difficultyLevel: this.difficulty_level,
      creatorId: this.creator_id,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
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
    tutorialOrm.estimated_duration = domainTutorial.estimatedDuration;
    tutorialOrm.difficulty_level = domainTutorial.difficultyLevel;
    tutorialOrm.creator_id = creatorId;
    tutorialOrm.created_at = domainTutorial.createdAt;
    tutorialOrm.updated_at = domainTutorial.updatedAt;
    return tutorialOrm;
  }
}
