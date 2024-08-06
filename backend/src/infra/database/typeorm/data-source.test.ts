// src/infra/database/typeorm/data-source.ts
import { DataSource } from 'typeorm';
import { UserOrm } from './entity/user.orm-entity';
import { TutorialOrm } from './entity/tutorial.orm-entity';

export const testDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST_TEST,
  port: Number(process.env.DB_PORT_TEST),
  username: process.env.DB_USERNAME_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_NAME_TEST,
  entities: [UserOrm, TutorialOrm],
  synchronize: true,
  migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
  logging: false,
});
