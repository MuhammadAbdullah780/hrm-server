import { AccountStatus, Admins, Gender } from '@prisma/client';
import { z } from 'zod';

export const AdminValidationSchema = z.object({
  account_status: z
    .nativeEnum(AccountStatus)
    .optional()
    .default(AccountStatus.ACTIVE),
  address: z.string().min(10).optional().default(null),
  birth_date: z.date().default(null),
  creation_date: z.date().optional().default(new Date()),
  email: z.string().email(),
  gender: z.nativeEnum(Gender).optional(),
  name: z.string().min(3),
  phone_number: z.string(), // ! later on applies regex,
  profile_picture: z.string().default(null),
});
