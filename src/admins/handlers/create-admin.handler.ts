import { generate } from 'generate-password';
import { IHandler } from 'src/shared/abstracts/handler';
import { CreateAdminDto } from '../typings';
import { AdminsService } from '../admins.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAdminHandler implements IHandler<CreateAdminDto> {
  constructor(private readonly adminService: AdminsService) {}

  async handle(args?: CreateAdminDto) {
    // preparing payload
    const payload = {
      ...args,
      password: generate({ numbers: true, uppercase: true }),
    };

    // creating doc
    const createdDoc = await this.adminService?.createNewAdmin(payload);

    return {
      data: createdDoc,
      message: 'Successfully created account for admin',
    };
  }
}
