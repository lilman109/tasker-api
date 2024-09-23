import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './user.model'; // User GraphQL model
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  // Get all users
  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany({
      include: { tasks: true }, // Include the related tasks
    });
  }

  // Get a single user by ID
  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true }, // Include the related tasks
    });
  }
}
