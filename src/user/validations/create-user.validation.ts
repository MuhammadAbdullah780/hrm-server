import { z } from 'zod';

export const createUserValidationSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  job_title: z.string(),
  work_hours: z.number().optional(),
});
