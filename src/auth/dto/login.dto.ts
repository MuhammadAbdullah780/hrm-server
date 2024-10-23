import { AccountTypeEnum } from 'src/shared/enums/account-type';
import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z
    .string({ message: 'Email is Required' })
    .email('This is not a valid email'),
  password: z.string({ message: 'Password is Required' }),
  account_type: z.nativeEnum(AccountTypeEnum, {
    message: 'Account type must be either ADMIN or USER',
  }),
});
