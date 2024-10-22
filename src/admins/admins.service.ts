import { Injectable } from '@nestjs/common';
import { Admins } from '@prisma/client';
import { CreateAdminDto } from './typings';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private db: PrismaService) {}

  async createNewAdmin(admin) {
    console.log('HERE');
    const data = await this.db?.admins?.create({
      data: admin,
    });
    return data;
  }
}
