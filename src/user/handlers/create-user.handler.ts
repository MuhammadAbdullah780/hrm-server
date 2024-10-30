import { HttpStatus, Injectable } from '@nestjs/common';
import { generate } from 'generate-password';
import { IHandler } from 'src/shared/abstracts/handler';
import { AppException } from 'src/shared/exceptions/app-exception';
import { CreateUserDto } from '../typings';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserHandler implements IHandler<CreateUserDto> {
  constructor(private readonly service: UserService) {}

  async handle(args: CreateUserDto) {
    // check if user exists with that email ?
    const isUerWithThatEmailExists = await this?.service?.isEmailExists(
      args?.email,
    );

    // if exists then throws error
    if (isUerWithThatEmailExists) {
      throw new AppException({
        msg: 'Email Already exists.',
        code: HttpStatus.NOT_IMPLEMENTED,
      });
    }

    // TODO password encryption

    // then preparing user payload
    const payload = {
      ...args,
      password: generate({
        numbers: true,
        uppercase: true,
        excludeSimilarCharacters: true,
      }),
    };

    // create new user
    const createdUser = await this?.service?.createNewUser(payload);

    // return response
    return {
      data: createdUser,
      message: 'Successfully created new user',
    };
  }
}
