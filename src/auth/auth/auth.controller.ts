import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command/create-user.command';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
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
}
