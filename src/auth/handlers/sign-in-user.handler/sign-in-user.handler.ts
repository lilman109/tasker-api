import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from 'src/auth/commands/sign-in-user.command/sign-in-user.command';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async execute(command: SignInUserCommand) {
    const { username, password } = command;

    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error('Username not found');
    }

    // compare password with bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid passwordh');
    }

    await this.cacheManager.set('userId', { userId: user.id });

    return user;
  }
}
