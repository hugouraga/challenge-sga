import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './infra/database/typeorm/entity/user.orm-entity';
import { TutorialOrm } from './infra/database/typeorm/entity/tutorial.orm-entity';
import { HttpModule } from './infra/http/_http.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'J@pa256010',
      database: 'sga_challange ',
      entities: [UserOrm, TutorialOrm],
      synchronize: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserOrm, TutorialOrm]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
