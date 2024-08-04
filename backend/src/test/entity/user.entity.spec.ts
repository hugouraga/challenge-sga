import { User } from '../../domain/entity/user.entity';

describe('User Entity', () => {
  it('should create a new user with valid data', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).not.toBe('password123');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw an error if updated name does not contain first and last name', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ name: 'John' })).rejects.toThrow(
      'Name must contain both first and last name',
    );
  });

  it('should throw an error if updated email is invalid', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ email: 'johnexample.com' })).rejects.toThrow(
      'Invalid email address',
    );
  });

  it('should throw an error if updated password is less than 8 characters', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ password: 'pass' })).rejects.toThrow(
      'Password must be at least 8 characters long',
    );
  });

  it('should update user data with valid updates', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await user.update({
      name: 'John Smith',
      email: 'johnsmith@example.com',
      password: 'newpassword123',
    });
    expect(user.name).toBe('John Smith');
    expect(user.email).toBe('johnsmith@example.com');
    expect(user.password).not.toBe('newpassword123');
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.updatedAt).not.toEqual(user.createdAt);
  });

  it('should throw an error if updated name does not contain first and last name', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ name: 'John' })).rejects.toThrow(
      'Name must contain both first and last name',
    );
  });

  it('should throw an error if updated email is invalid', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ email: 'johnexample.com' })).rejects.toThrow(
      'Invalid email address',
    );
  });

  it('should throw an error if updated password is less than 8 characters', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    await expect(user.update({ password: 'pass' })).rejects.toThrow(
      'Password must be at least 8 characters long',
    );
  });

  it('should validate password correctly', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    const isValid = await user.comparePassword('password123');
    expect(isValid).toBe(true);
  });

  it('should invalidate incorrect password', async () => {
    const user = await User.createNew(
      'John Doe',
      'john@example.com',
      'password123',
    );
    const isValid = await user.comparePassword('wrongpassword');
    expect(isValid).toBe(false);
  });
});
