import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

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
