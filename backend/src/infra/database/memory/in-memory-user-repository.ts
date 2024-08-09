import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entity/user.entity';
import {
  findUsersInterface,
  UserRepository,
} from '@/domain/repository/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private userList: User[] = [];

  async getById(id: string): Promise<User | null> {
    const user = this.userList.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.userList.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(user: User): Promise<User> {
    this.userList.push(user);
    return user;
  }

  async update(id: string, updatedUser: Partial<User>): Promise<User> {
    const index = this.userList.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const currentUser = this.userList[index];
    currentUser.update(updatedUser);

    this.userList[index] = currentUser;
    return currentUser;
  }

  async findUsers({ page, limit, name }: findUsersInterface): Promise<any> {
    let filteredUsers = this.userList;

    if (name) {
      filteredUsers = filteredUsers.filter((user) => user.name.includes(name));
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const users = filteredUsers.slice(start, end);

    return {
      users,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
}
