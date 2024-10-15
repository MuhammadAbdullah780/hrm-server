import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/_models/user';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(
    // @InjectModel(User.name)
    // private readonly userModel: Model<User>,
    private readonly db: PrismaService,
  ) {}

  async isEmailExists(email: string) {
    return Boolean(
      await this.db?.user?.count({
        where: {
          email,
        },
      }),
    );
  }

  async createNewUser(doc: any) {
    const data = await this.db?.user?.create({
      data: doc,
    });

    return data;
  }

  async validateNewUserConditions() {}

  async getUserByEmail(email: string, extra?: { includePassword?: boolean }) {
    const data = await this.db?.user?.findFirst({
      where: {
        email,
      },
    });

    return data;
  }

  async getUserThroughId(id: string) {
    return await this.db?.user?.findFirst({ where: { id } });
  }
}
