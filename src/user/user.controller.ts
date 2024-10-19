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
import { Claims } from 'src/shared/decorators/claims.decorator';
import { AppClaimsEnum } from 'src/shared/enums/app-claims';
import { AccountType } from 'src/shared/decorators/set-account-type.decorator';
import { AccountTypeEnum } from 'src/shared/enums/account-type';

@Controller()
@AccountType(AccountTypeEnum.ADMIN)
export class UserController {
  constructor(
    // Handlers
    private readonly createUserHandler: CreateUserHandler,
  ) {}

  /**
   * @description Api to create new account for user
   * @endpoint `/api/v1/user/create`
   * @method `GET`
   */
  @Claims(AppClaimsEnum.ADD_NEW_USER)
  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    return await this.createUserHandler?.handle(body);
  }
}
