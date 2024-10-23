import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/models/user';
import { DbModels } from 'src/db/typings';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  async isEmailExists(email: string) {
    return Boolean();
    // await this.db?.user?.count({
    //   where: {
    //     email,
    //   },
    // }),
  }

  async createNewUser(doc: any) {
    // const data = await this.db?.user?.create({
    //   data: doc,
    // });
    // return data;
  }

  async validateNewUserConditions() {}

  async getUserByEmail(email: string) {
    const data = await this?.model
      ?.findOne({ email })
      ?.select('+password')
      ?.lean(true);

    return data;
  }

  async getUserThroughId(id: string) {
    return (await this?.model?.findById(id)?.lean(true)) as DbModels.IUser;
    // return await this.db?.user?.findFirst({ where: { id } });
  }
}
