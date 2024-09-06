import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskHandler } from './create-task.handler';

describe('CreateTaskHandler', () => {
  it('should be defined', () => {
    const prismaMock = {} as PrismaService;
    expect(new CreateTaskHandler(prismaMock)).toBeDefined();
  });
});
