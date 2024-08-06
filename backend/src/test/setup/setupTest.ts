import { testDataSource } from '@/infra/database/typeorm/data-source.test';

beforeAll(async () => {
  await testDataSource.initialize();
});

afterAll(async () => {
  await testDataSource.destroy();
});
