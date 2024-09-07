import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserHandler } from './create-user.handler';

describe('CreateUserHandlerTs', () => {
  it('should be defined', () => {
    const prismaMock = {} as PrismaService;
    expect(new CreateUserHandler(prismaMock)).toBeDefined();
  });
});
