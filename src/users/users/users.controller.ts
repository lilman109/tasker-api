import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command/create-user.command';
import { GetUsersQuery } from '../queries/get-users.query/get-users.query';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('signup')
  async create(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    const { username, password } = body;
    const user: User = await this.commandBus.execute(
      new CreateUserCommand(username, password),
    );

    req.session.userId = user.id;

    return user;
  }

  @Get()
  async get() {
    return this.queryBus.execute(new GetUsersQuery());
  }
}
