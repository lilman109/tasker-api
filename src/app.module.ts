import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TasksModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 86400000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
