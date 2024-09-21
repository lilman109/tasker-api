import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetUsersHandler } from './handlers/get-users.handler/get-users.handler';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [GetUsersHandler, UserResolver],
  controllers: [UsersController],
})
export class UsersModule {}
