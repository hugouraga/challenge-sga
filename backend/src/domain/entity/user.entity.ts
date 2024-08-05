import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '@/domain/interface/user-interface';
import { CustomError } from '@/utils/error/custom.error';

export class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
  }: UserInterface) {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePassword(password);

    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public static async createNew(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const now = new Date();
    const hashedPassword = await bcrypt.hash(password, 6);
    return new User({
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromDatabase(data: UserInterface): User {
    return new User(data);
  }

  private validateName(name: string): void {
    if (name !== undefined && !name.includes(' ')) {
      throw new CustomError('Name must contain both first and last name', 400);
    }
  }

  private validateEmail(email: string): void {
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new CustomError('Invalid email address', 400);
      }
    }
  }

  private validatePassword(password: string): void {
    if (password !== undefined && password.length < 8) {
      throw new CustomError('Password must be at least 8 characters long', 400);
    }
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public async update(updatedUser: Partial<UserInterface>): Promise<void> {
    if (updatedUser.name !== undefined) {
      this.validateName(updatedUser.name);
      this._name = updatedUser.name;
    }
    if (updatedUser.email !== undefined) {
      this.validateEmail(updatedUser.email);
      this._email = updatedUser.email;
    }
    if (updatedUser.password !== undefined) {
      this.validatePassword(updatedUser.password);
      this._password = await bcrypt.hash(updatedUser.password, 6);
    }
    this._updatedAt = new Date();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this._password);
  }
}
