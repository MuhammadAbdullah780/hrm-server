import { Controller } from '@nestjs/common';
import { IsRestrictedToUser } from 'src/shared/decorators/is-restricted-to-user.decorator';
import { AccountType } from 'src/shared/decorators/set-account-type.decorator';
import { AccountTypeEnum } from 'src/shared/enums/account-type';

@Controller()
@AccountType(AccountTypeEnum.ADMIN)
@IsRestrictedToUser(true)
export class AccessManagerController {}
