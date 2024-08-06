import { DataSource } from 'typeorm';
import { UserOrm } from './entity/user.orm-entity';
import { TutorialOrm } from './entity/tutorial.orm-entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'xxxxx',
  password: 'xxxxx',
  database: 'sga_challange',
  entities: [UserOrm, TutorialOrm],
  migrations: ['src/infra/database/typeorm/migrations/*.ts'],
  synchronize: false,
});
