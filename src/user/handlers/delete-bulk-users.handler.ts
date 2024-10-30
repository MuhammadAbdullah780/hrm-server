import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';
import { DeleteBulkUserDto } from '../typings';
import { UserService } from '../user.service';

@Injectable()
export class DeleteBulkUserHandler implements IHandler<DeleteBulkUserDto> {
  constructor(private readonly service: UserService) {}

  async handle({ user_ids }: DeleteBulkUserDto) {
    // check if the logged in user has permission to do this task or not

    // deleting bulk users
    const deleted = await this?.service?.deleteBulkUsers(user_ids);

    // returning response
    return {
      data: deleted,
      message: 'Successfully deleted bulk users',
    };
  }
}
