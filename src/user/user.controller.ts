import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { CreateUserHandler } from './handlers/create-user.handler';
import { JwtGuard } from 'src/shared/guards/jwt.guard';

@Controller()
export class UserController {
  constructor(
    // Handlers
    private readonly createUserHandler: CreateUserHandler,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    return await this.createUserHandler?.handle(body);
  }
}
