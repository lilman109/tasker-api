import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersHandler } from './get-users.handler';

describe('GetUsersHandler', () => {
  it('should be defined', () => {
    const prismaMock = {} as PrismaService;
    expect(new GetUsersHandler(prismaMock)).toBeDefined();
  });
});
