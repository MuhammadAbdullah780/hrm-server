import { Admins, User } from '@prisma/client';
import { Request } from 'express';
import { Moment } from 'moment';
import { AccountTypeEnum } from '../enums/account-type';

export type DateType = Moment | Date;

export type TokenDecoded = {
  id: string;
};

export type RequestModified = Request & {
  user?: Admins | User;
  accountType?: AccountTypeEnum;
};
