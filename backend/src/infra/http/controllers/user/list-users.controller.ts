import { GetUsersUseCase } from '@/application/use-cases/user/get-list-users.use-case';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class ListUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async findUsers(
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 200,
  ): Promise<any> {
    return await this.getUsersUseCase.execute({ name, page, limit });
  }
}
