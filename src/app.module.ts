import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskResolver } from './tasks/task.resolver';
import { UserResolver } from './users/user.resolver';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TasksModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService, TaskResolver, UserResolver],
})
export class AppModule {}
