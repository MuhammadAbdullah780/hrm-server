import { z } from 'zod';
import { User, Gender, WorkType } from '@prisma/client';

const d = Object.values(Gender);

export const UserValidationSchema = z.object({
  address: z
    .string()
    .min(10, 'Address contains minimum of 10 characters')
    .optional(),
  birth_date: z.date().optional().default(null),
  education: z.array(z.object({})).optional().default([]),
  email: z.string().email(),
  employment_status: z.array(z.object({})).optional().default([]),
  employment_type: z.array(z.object({})).optional().default([]),
  experience: z.array(z.object({})).optional().default([]),
  gender: z.nativeEnum(Gender).optional().default(null),
  hire_date: z.date().optional().default(new Date(Date.now())),
  job_title: z.string(),
  name: z.string().min(3),
  password: z.string().min(8),
  phone_number: z.string(),
  profile_picture: z.string().optional().default(null),
  work_hours: z.number().min(1).max(8).optional().default(8),
  work_type: z.nativeEnum(WorkType).optional().default(WorkType.HYBRID),
  creation_date: z.date().optional().default(new Date(Date.now())),
});
