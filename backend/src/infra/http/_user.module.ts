import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { UserCreateController } from './controllers/user/create-user.controller';
import { SignInUserUseCase } from '@/application/use-cases/user/sign-in-user.use-case';
import { UserSignInController } from './controllers/user/auth-user.controller';
import { UpdateUserUseCase } from '@/application/use-cases/user/update-user.use-case';
import { UserUpdateController } from './controllers/user/update-user.controller';
import { UserRepository } from '@/domain/repository/user.repository';
import { TypeOrmUserRepository } from '@/infra/database/typeorm/repository/typeorm-user.repository';
import { UserOrm } from '@/infra/database/typeorm/entity/user.orm-entity';
import { AuthModule } from './auth/auth.module';
import { ListUsersController } from './controllers/user/list-users.controller';
import { GetUsersUseCase } from '@/application/use-cases/user/get-list-users.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrm]), forwardRef(() => AuthModule)],
  controllers: [
    UserSignInController,
    UserCreateController,
    UserUpdateController,
    ListUsersController,
  ],
  providers: [
    CreateUserUseCase,
    SignInUserUseCase,
    UpdateUserUseCase,
    GetUsersUseCase,
    { provide: UserRepository, useClass: TypeOrmUserRepository },
  ],
  exports: [UserRepository, TypeOrmModule],
})
export class UserModule {}
