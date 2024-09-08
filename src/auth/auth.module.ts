import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { CreateUserHandler } from './handlers/create-user.handler/create-user.handler';
import { SignInUserHandler } from './handlers/sign-in-user.handler/sign-in-user.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CreateUserHandler, SignInUserHandler],
  controllers: [AuthController],
})
export class AuthModule {}
