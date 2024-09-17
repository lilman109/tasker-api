import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command/create-user.command';
import { Request } from 'express';
import { User } from '@prisma/client';
import { SignInUserCommand } from '../commands/sign-in-user.command/sign-in-user.command';
import { RedisService } from 'src/redis/redis.service';
import { IsUserAuthenticatedQuery } from '../queries/is-user-authenticated.query/is-user-authenticated.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly redis: RedisService,
  ) {}

  @Get()
  async get(@Req() req: Request) {
    return this.queryBus.execute(new IsUserAuthenticatedQuery());
  }

  @Post('signup')
  async create(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    const { username, password } = body;
    const user: User = await this.commandBus.execute(
      new CreateUserCommand(username, password),
    );

    await this.redis.saveUserId(`${user.id}`);

    return user;
  }

  @Post('signin')
  async signin(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    const { username, password } = body;
    const user: User = await this.commandBus.execute(
      new SignInUserCommand(username, password),
    );

    await this.redis.saveUserId(`${user.id}`);

    return user;
  }
}
