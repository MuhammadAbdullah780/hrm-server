import { z } from 'zod';
import { loginValidationSchema } from './validations/login';

export type LoginDto = z.infer<typeof loginValidationSchema>;
