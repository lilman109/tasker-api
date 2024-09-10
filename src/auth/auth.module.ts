import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { CreateUserHandler } from './handlers/create-user.handler/create-user.handler';
import { SignInUserHandler } from './handlers/sign-in-user.handler/sign-in-user.handler';
import { IsUserAuthenticatedHandler } from './handlers/is-user-authenticated.handler/is-user-authenticated.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CreateUserHandler, SignInUserHandler, IsUserAuthenticatedHandler],
  controllers: [AuthController],
})
export class AuthModule {}
