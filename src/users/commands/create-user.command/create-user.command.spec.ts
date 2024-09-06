import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserCommand } from './create-user.command';

describe('CreateUserCommandTs', () => {
  it('should be defined', () => {
    const username = 'username';
    const password = 'password';
    expect(new CreateUserCommand(username, password)).toBeDefined();
  });
});
