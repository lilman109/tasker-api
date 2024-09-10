import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command/create-user.command';
import { User } from '@prisma/client';
import { SignInUserCommand } from '../commands/sign-in-user.command/sign-in-user.command';
import { IsUserAuthenticatedQuery } from '../queries/is-user-authenticated.query/is-user-authenticated.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get() {
    return await this.queryBus.execute(new IsUserAuthenticatedQuery());
  }

  @Post('signup')
  async create(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user: User = await this.commandBus.execute(
      new CreateUserCommand(username, password),
    );

    return user;
  }

  @Post('signin')
  async signin(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user: User = await this.commandBus.execute(
      new SignInUserCommand(username, password),
    );

    return user;
  }
}
