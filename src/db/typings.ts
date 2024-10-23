import { MongoId } from 'src/shared/types/shared';
import { User } from './models/user';
import { Admin } from './models/admins';

export namespace DbModels {
  //
  type CommonFields = {
    created_at: Date;
    updated_at: Date;
    _id: MongoId;
    __v: 0;
  };

  /**
   * Export Model Typescript Type
   */
  export type IUser = User & CommonFields;
  export type IAdmin = Admin & CommonFields;
}
