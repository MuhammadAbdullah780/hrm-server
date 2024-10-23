import { Request } from 'express';
import { Moment } from 'moment';
import { Types } from 'mongoose';
import { DbModels } from 'src/db/typings';
import { AccountTypeEnum } from '../enums/account-type';

export type DateType = Moment | Date;

export type MongoId = string | Types.ObjectId;

export type TokenDecoded = {
  id: string;
  account_type: AccountTypeEnum;
};

export type RequestModified = Request & {
  user?: DbModels.IAdmin | DbModels.IUser;
  accountType?: AccountTypeEnum;
};
