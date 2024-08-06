// test/integration/user.integration.spec.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { testDataSource } from '@/infra/database/typeorm/data-source.test';
import request from 'supertest';
import { UserOrm } from '@/infra/database/typeorm/entity/user.orm-entity';

describe('User Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await app.close();
    await testDataSource.destroy();
  });

  beforeEach(async () => {
    await testDataSource.getRepository(UserOrm).clear();
  });

  it('should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('userName', 'John Doe');
    expect(response.body).toHaveProperty('userEmail', 'john.doe@example.com');
  });

  // Outros testes de integração...
});
