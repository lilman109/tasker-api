import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Task } from './task.model'; // Task GraphQL model
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  // Get all tasks
  @Query(() => [Task])
  async tasks() {
    const userId = await this.redis.getUserId();

    if (!userId) {
      throw new Error('User not found');
    }

    return this.prisma.task.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }

  // Create a new task
  @Mutation(() => Task)
  async createTask(@Args('title') title: string) {
    const userId = await this.redis.getUserId();

    if (!userId) {
      throw new Error('User not found');
    }
    return this.prisma.task.create({
      data: {
        title,
        userId: parseInt(userId),
      },
    });
  }

  // Delete a task by ID
  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => Int }) id: number) {
    await this.prisma.task.delete({
      where: { id },
    });
    return true;
  }
}
