import { SetMetadata } from '@nestjs/common';
import { AccountTypeEnum } from '../enums/account-type';

export const ACCOUNT_TYPE_KEY = 'accountType';

export const AccountType = (accountType: AccountTypeEnum) =>
  SetMetadata(ACCOUNT_TYPE_KEY, accountType);
