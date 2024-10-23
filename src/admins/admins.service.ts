import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/db/models/admins';
import { CreateAdminDto } from './typings';
import { MongoId } from 'src/shared/types/shared';
import { DbModels } from 'src/db/typings';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name)
    private readonly model: Model<Admin>,
  ) {}

  async createNewAdmin(admin: CreateAdminDto) {
    const data = await this?.model?.create(admin);

    return data;
  }

  async isEmailExists(email: string) {
    const isExists = await this?.model?.findOne(
      { email },
      { email: 1, _id: 0 },
    );
    return isExists ? true : false;
  }

  async getAdminInfoThroughEmail(email: string) {
    return await this?.model
      ?.findOne({ email })
      ?.select('+password')
      ?.lean(true);
  }

  async getAdminThroughId(id: MongoId) {
    return (await this?.model?.findById(id)?.lean(true)) as DbModels.IAdmin;
  }
}
