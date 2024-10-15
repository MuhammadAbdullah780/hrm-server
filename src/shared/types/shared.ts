import { Moment } from 'moment';
import { Types } from 'mongoose';

export type DateType = Moment | Date;

export type TokenDecoded = {
  id: string;
};
