import { z } from 'zod';

export const paginationValidationSchema = z.object({
  page: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: 'Page must be a number' })
    .transform((val) => Number(val))
    .optional()
    .default('1'),

  limit: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: 'Limit must be a number' })
    .transform((val) => Number(val))
    .optional()
    .default('10'),
});
