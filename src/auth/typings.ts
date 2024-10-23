import { z } from 'zod';
import { loginValidationSchema } from './dto/login.dto';

export type LoginDto = z.infer<typeof loginValidationSchema>;
