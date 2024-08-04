import { User } from '@/domain/entity/user.entity';

export abstract class UserRepository {
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, updatedUser: Partial<User>): Promise<User>;
  abstract signIn(email: string, password: string): Promise<User>;
}
