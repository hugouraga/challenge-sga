import { Module } from '@nestjs/common';
import { CreateTutorialController } from './controllers/tutorial/create-tutorial.controller';
import { DeleteTutorialController } from './controllers/tutorial/delete-tutorial.controller';
import { GetTutorialByIdController } from './controllers/tutorial/get-tutorial-by-id.controller';
import { ListTutorialsController } from './controllers/tutorial/list-tutorials.controller';
import { UpdateTutorialController } from './controllers/tutorial/update-tutorial.controller';
import { CreateTutorialUseCase } from '@/application/use-cases/tutorial/create-tutorial.use-case';
import { GetTutorialUseCase } from '@/application/use-cases/tutorial/get-tutorial-id.use-case';
import { DeleteTutorialUseCase } from '@/application/use-cases/tutorial/delete-tutorial.use-case';
import { UpdateTutorialUseCase } from '@/application/use-cases/tutorial/update-tutorial.use-case';
import { GetTutorialsByUserIdUseCase } from '@/application/use-cases/tutorial/get-tutorials-user-id.use-case';
import { TutorialRepository } from '@/domain/repository/tutorial.repository';
import { InMemoryTutorialRepository } from '@/infra/database/memory/in-memory-tutorial.repository';

@Module({
  controllers: [
    CreateTutorialController,
    DeleteTutorialController,
    GetTutorialByIdController,
    ListTutorialsController,
    UpdateTutorialController,
  ],
  providers: [
    CreateTutorialUseCase,
    GetTutorialUseCase,
    DeleteTutorialUseCase,
    UpdateTutorialUseCase,
    GetTutorialsByUserIdUseCase,
    { provide: TutorialRepository, useClass: InMemoryTutorialRepository },
  ],
})
export class TutorialModule {}
