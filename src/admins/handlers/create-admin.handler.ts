import { generate } from 'generate-password';
import { IHandler } from 'src/shared/abstracts/handler';
import { CreateAdminDto } from '../typings';
import { AdminsService } from '../admins.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/shared/exceptions/app-exception';

@Injectable()
export class CreateAdminHandler implements IHandler<CreateAdminDto> {
  constructor(private readonly adminService: AdminsService) {}

  async handle(args?: CreateAdminDto) {
    // check if that email is exists
    const isEmailExists = await this.adminService?.isEmailExists(args?.email);

    // if exists then throw error
    if (isEmailExists) {
      throw new AppException({
        msg: 'Email Already Exists.',
        code: HttpStatus.NOT_IMPLEMENTED,
      });
    }

    // preparing payload
    const payload = {
      ...args,
      password: generate({ numbers: true, uppercase: true }), // auto generate password
    };

    // creating doc
    const createdDoc = await this.adminService?.createNewAdmin(payload);

    return {
      data: createdDoc,
      message: 'Successfully created account for admin',
    };
  }
}
