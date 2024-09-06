import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { GetUsersHandler } from './handlers/get-users.handler/get-users.handler';
import { CreateUserHandler } from './handlers/create-user.handler/create-user.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CreateUserHandler, GetUsersHandler],
  controllers: [UsersController],
})
export class UsersModule {}
