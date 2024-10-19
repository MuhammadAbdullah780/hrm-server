import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// export class LoginDto {
//   @IsString()
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   password: string;
// }

import { z } from 'zod';

export const LoginDto = z.object({
  email: z
    .string({ message: 'Email is Required' })
    .email('This is not a valid email'),
  password: z.string({ message: 'Password is Required' }),
});
