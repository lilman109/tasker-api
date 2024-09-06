import { QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersQuery } from 'src/users/queries/get-users.query/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUsersQuery) {
    return this.prisma.user.findMany();
  }
}
