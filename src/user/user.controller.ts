import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Claims } from 'src/shared/decorators/claims.decorator';
import { AccountType } from 'src/shared/decorators/set-account-type.decorator';
import { AccountTypeEnum } from 'src/shared/enums/account-type';
import { AppClaimsEnum } from 'src/shared/enums/app-claims';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { CreateUserHandler } from './handlers/create-user.handler';
import { DeleteBulkUserHandler } from './handlers/delete-bulk-users.handler';
import { EditBulkUserHandler } from './handlers/edit-bulk-users.handler';
import { EditSpecificUserHandler } from './handlers/edit-specific-user.handler';
import { GetUserListingHandler } from './handlers/get-user-listing.handler';
import { CreateUserDto, DeleteBulkUserDto, EditBulkUserDto } from './typings';
import { createUserValidationSchema } from './validations/create-user.validation';
import { deleteBulkUserValidationSchema } from './validations/delete-bulk.validation';
import { bulkEditUserValidationSchema } from './validations/edit-bulk-user.validation';

@Controller()
@AccountType(AccountTypeEnum.ADMIN)
export class UserController {
  constructor(
    // Handlers
    private readonly createUserHandler: CreateUserHandler,
    private readonly bulkEditHandler: EditBulkUserHandler,
    private readonly editSpecificUserHandler: EditSpecificUserHandler,
    private readonly getUserListingHandler: GetUserListingHandler,
    private readonly deleteBulkHandler: DeleteBulkUserHandler,
  ) {}

  /**
   * @description Api to create new account for user
   * @endpoint `/api/v1/user/create`
   * @method `GET`
   */
  @Claims(AppClaimsEnum.ADD_NEW_USER)
  @UsePipes(new ZodValidationPipe(createUserValidationSchema))
  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    return await this.createUserHandler?.handle(body);
  }

  /**
   * @description Api to delete multiple user accounts
   * @endpoint `/api/v1/user/delete-bulk`
   * @method `DELETE`
   */
  @Delete('/delete-bulk')
  @UsePipes(new ZodValidationPipe(deleteBulkUserValidationSchema))
  async deleteBulk(@Body() body: DeleteBulkUserDto) {
    return await this?.deleteBulkHandler.handle(body);
  }

  /**
   * @description Api to edit multiple users at once
   * @endpoint `/api/v1/user/edit-bulk`
   * @method `PATCH`
   */
  @Patch('/edit-bulk')
  @UsePipes(new ZodValidationPipe(bulkEditUserValidationSchema))
  async bulkEdit(@Body() body: EditBulkUserDto) {
    return await this?.bulkEditHandler?.handle(body);
  }

  /**
   * @description Api to edit fields of single user account
   * @endpoint `/api/v1/user/{id}/edit`
   * @method `PATCH`
   */
  @Patch('/:id/edit')
  async editSpecific() {
    return await this?.editSpecificUserHandler?.handle();
  }

  /**
   * @description Api to get listing of users
   * @endpoint `/api/v1/user/`
   * @method `GET`
   */
  @Get('/')
  async getUserListing() {
    return await this?.getUserListingHandler?.handle();
  }

  getSpecificUser() {}
}
