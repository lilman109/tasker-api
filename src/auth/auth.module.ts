import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { CreateUserHandler } from './handlers/create-user.handler/create-user.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CreateUserHandler],
  controllers: [AuthController],
})
export class AuthModule {}
