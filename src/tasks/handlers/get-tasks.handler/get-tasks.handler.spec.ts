import { PrismaService } from 'src/prisma/prisma.service';
import { GetTasksHandler } from './get-tasks.handler';

describe('GetTasksHandler', () => {
  it('should be defined', () => {
    const prismaMock = {} as PrismaService;
    expect(new GetTasksHandler(prismaMock)).toBeDefined();
  });
});
