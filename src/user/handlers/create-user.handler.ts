import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';
import { CreateUserDto } from '../dto/create-user';

@Injectable()
export class CreateUserHandler implements IHandler<CreateUserDto> {
  constructor() {}

  async handle(args: CreateUserDto) {}
}
