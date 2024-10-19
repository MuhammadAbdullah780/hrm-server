import { Controller, Post, UseGuards } from '@nestjs/common';
import { Claims } from 'src/shared/decorators/claims.decorator';
import { IsRestrictedToUser } from 'src/shared/decorators/is-restricted-to-user.decorator';
import { AccountType } from 'src/shared/decorators/set-account-type.decorator';
import { AccountTypeEnum } from 'src/shared/enums/account-type';
import { AppClaimsEnum } from 'src/shared/enums/app-claims';
import { JwtGuard } from 'src/shared/guards/jwt.guard';

@Controller()
@AccountType(AccountTypeEnum.ADMIN)
@IsRestrictedToUser(true)
export class AdminsController {
  constructor() {}

  /**
   * @description Api to create new account of admin
   * @endpoint `/api/v1/admin/create`
   * @method `GET`
   */
  @Claims(AppClaimsEnum.ADD_NEW_ADMIN)
  @UseGuards(JwtGuard)
  @Post('/create')
  async createNewAdmin() {}
}
