import { QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from 'src/users/queries/get-users.query/get-users.query';
import { PrismaService } from 'src/prisma/prisma.service';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUsersQuery) {
    return this.prisma.user.findMany();
  }
}
