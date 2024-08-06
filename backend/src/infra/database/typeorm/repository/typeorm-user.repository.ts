import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as DomainUser } from '@/domain/entity/user.entity';
import { UserRepository } from '@/domain/repository/user.repository';
import { UserOrm } from '../entity/user.orm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrm)
    private readonly repository: Repository<UserOrm>,
  ) {}

  async getById(id: string): Promise<DomainUser> {
    const userOrm = await this.repository.findOne({
      where: { id },
      relations: ['tutorials'],
    });
    return userOrm ? userOrm.toDomain() : null;
  }

  async getByEmail(email: string): Promise<DomainUser> {
    const userOrm = await this.repository.findOne({
      where: { email },
      relations: ['tutorials'],
    });
    return userOrm ? userOrm.toDomain() : null;
  }

  async create(user: DomainUser): Promise<DomainUser> {
    const userOrm = this.repository.create(UserOrm.fromDomain(user));
    const savedUserOrm = await this.repository.save(userOrm);
    return savedUserOrm.toDomain();
  }

  async update(
    id: string,
    updatedUser: Partial<DomainUser>,
  ): Promise<DomainUser> {
    const userOrm = await this.repository.findOne({
      where: { id },
    });
    if (!userOrm) {
      throw new Error('User not found');
    }
    Object.assign(userOrm, updatedUser);
    const savedUserOrm = await this.repository.save(userOrm);
    return savedUserOrm.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
