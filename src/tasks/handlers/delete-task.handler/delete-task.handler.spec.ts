import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteTaskHandler } from './delete-task.handler';

describe('DeleteTaskHandler', () => {
  it('should be defined', () => {
    const prismaMock = {} as PrismaService;
    expect(new DeleteTaskHandler(prismaMock)).toBeDefined();
  });
});
