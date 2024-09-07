import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetUsersHandler } from './handlers/get-users.handler/get-users.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [GetUsersHandler],
  controllers: [UsersController],
})
export class UsersModule {}
