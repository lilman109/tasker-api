import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from 'src/auth/commands/sign-in-user.command/sign-in-user.command';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

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

    return user;
  }
}
