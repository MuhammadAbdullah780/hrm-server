import { AccountStatus, Gender } from 'src/db/enums/shared';
import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  name: z.string().min(3),
  phone_number: z.string().optional(), // ! later on applies regex,
  creation_date: z.date().default(new Date()),
  account_status: z
    .nativeEnum(AccountStatus)
    .optional()
    .default(AccountStatus.ACTIVE),
  last_login: z.date().optional(),
  email: z.string().email(),
  profile_picture: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  birth_date: z.date().optional(),
  address: z.string().min(10).optional(),
});
