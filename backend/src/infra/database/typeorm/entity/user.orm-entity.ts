import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TutorialOrm } from './tutorial.orm-entity';
import { User as DomainUser } from '@/domain/entity/user.entity';

@Entity('users')
export class UserOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TutorialOrm, (tutorial) => tutorial.creator)
  tutorials: TutorialOrm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toDomain(): DomainUser {
    return DomainUser.fromDatabase({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(domainUser: DomainUser): UserOrm {
    const userOrm = new UserOrm();
    userOrm.id = domainUser.id;
    userOrm.name = domainUser.name;
    userOrm.email = domainUser.email;
    userOrm.password = domainUser.password;
    userOrm.createdAt = domainUser.createdAt;
    userOrm.updatedAt = domainUser.updatedAt;
    return userOrm;
  }
}
