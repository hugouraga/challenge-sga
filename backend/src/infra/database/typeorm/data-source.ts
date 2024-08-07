// src/infra/database/typeorm/data-source.ts
import { DataSource } from 'typeorm';
import { UserOrm } from './entity/user.orm-entity';
import { TutorialOrm } from './entity/tutorial.orm-entity';
import 'dotenv/config';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserOrm, TutorialOrm],
  synchronize: false,
  migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
  logging: false,
});
