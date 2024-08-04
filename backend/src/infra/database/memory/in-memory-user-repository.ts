import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repository/user.repository';
import { User } from '@/domain/entity/user.entity';

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

  async signIn(email: string, password: string): Promise<User> {
    const user = this.userList.find((user) => user.email === email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    return user;
  }
}
