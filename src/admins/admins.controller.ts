import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Claims } from 'src/shared/decorators/claims.decorator';
import { IsRestrictedToUser } from 'src/shared/decorators/is-restricted-to-user.decorator';
import { AccountType } from 'src/shared/decorators/set-account-type.decorator';
import { AccountTypeEnum } from 'src/shared/enums/account-type';
import { AppClaimsEnum } from 'src/shared/enums/app-claims';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { CreateAdminDto } from './typings';
import { createAdminValidationSchema } from './validations/create-admin.validation';
import { CreateAdminHandler } from './handlers/create-admin.handler';

@Controller()
@AccountType(AccountTypeEnum.ADMIN)
// @UseGuards(JwtGuard)
@IsRestrictedToUser(true)
export class AdminsController {
  constructor(private readonly createAdminHandler: CreateAdminHandler) {}

  /**
   * @description Api to create new account of admin
   * @endpoint `/api/v1/admin/create`
   * @method `GET`
   */
  @Post('/create')
  @Claims(AppClaimsEnum.ADD_NEW_ADMIN)
  @UsePipes(new ZodValidationPipe(createAdminValidationSchema))
  async createNewAdmin(@Body() body: CreateAdminDto) {
    return await this.createAdminHandler?.handle(body);
  }
}
