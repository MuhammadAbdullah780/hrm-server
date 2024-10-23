import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { IHandler } from 'src/shared/abstracts/handler';
import { AccountTypeEnum } from 'src/shared/enums/account-type';
import { AppException } from 'src/shared/exceptions/app-exception';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { LoginDto } from '../typings';

@Injectable()
export class LoginHandler implements IHandler<LoginDto> {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly adminService: AdminsService,
  ) {}

  async handle(arg: LoginDto) {
    const { email, password, account_type } = arg;

    /* ========== LOGIN SCENARIOS ON ACCOUNT TYPE ========== */
    switch (account_type) {
      /**
       * === LOGIN SCENARIOS FOR ADMIN ===
       */
      case AccountTypeEnum.ADMIN:
        //  fetch admin record through email
        const targetedAdmin =
          await this?.adminService?.getAdminInfoThroughEmail(email);

        // if email does not exists -- throw error
        if (!targetedAdmin) {
          throw new AppException({
            msg: 'Email not exist.',
            code: HttpStatus.NOT_FOUND,
          });
        }

        // Comparing Passwords
        // ! later on shift with bcrypt logic
        if (targetedAdmin?.password !== password) {
          throw new AppException({
            msg: "Password doesn't match.",
            code: HttpStatus.NOT_IMPLEMENTED,
          });
        }

        // generating token
        const adminTokenPayload = await this?.authService?.getAccessToken({
          id: targetedAdmin?._id,
          account_type: AccountTypeEnum.ADMIN,
        });

        const { password: __, ...adminWithoutPass } = targetedAdmin;

        return {
          data: {
            user: adminWithoutPass,
            tokens: {
              access_token: adminTokenPayload?.token,
            },
            expires_in: adminTokenPayload?.expires_in,
          },
          message: 'Logged in successfully.',
        };

      /**
       * === LOGIN SCENARIOS FOR USER ===
       */
      case AccountTypeEnum.USER:
        // fetch user through that email
        const user = await this?.userService?.getUserByEmail(email);

        // if email does not exists --- throw error
        if (!user) {
          throw new AppException({
            msg: 'Email not exist.',
            code: HttpStatus.NOT_FOUND,
          });
        }

        // Comparing Passwords
        // ! later on shift with bcrypt logic
        if (user?.password !== password) {
          throw new AppException({
            msg: "Password doesn't match.",
            code: HttpStatus.NOT_IMPLEMENTED,
          });
        }

        // generating token
        const userTokenPayload = await this?.authService?.getAccessToken({
          id: user?._id,
          account_type: AccountTypeEnum.ADMIN,
        });

        const { password: _, ...userWithoutPass } = targetedAdmin;

        return {
          data: {
            user: userWithoutPass,
            tokens: {
              access_token: userTokenPayload?.token,
            },
            expires_in: userTokenPayload?.expires_in,
          },
          message: 'Logged in successfully.',
        };
    }
  }
}
