import { HttpStatus, Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';
import { LoginDto } from '../dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AppException } from 'src/shared/exceptions/app-exception';
import { AuthService } from '../auth.service';
import { z } from 'zod';

@Injectable()
export class LoginHandler implements IHandler<z.infer<typeof LoginDto>> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async handle(arg: z.infer<typeof LoginDto>) {
    const { email, password } = arg;

    // Check for email existance
    const existedUser = await this?.userService?.getUserByEmail(email, {
      includePassword: true,
    });

    if (!existedUser) {
      throw new AppException({
        msg: 'Invalid Email',
        code: HttpStatus.NOT_IMPLEMENTED,
      });
    }

    // Comparing Passwords
    // later on shift with bcrypt logic
    if (existedUser?.password !== password) {
      throw new AppException({ msg: "Password doesn't match." });
    }

    // now creates access token
    const { expires_in, token } = await this?.authService?.getAccessToken({
      id: existedUser?.id,
    });

    return {
      user: existedUser,
      tokens: {
        access_token: token,
      },
      expires_in,
    };
  }
}
