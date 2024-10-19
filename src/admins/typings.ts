import { z } from 'zod';
import { createAdminValidationSchema } from './validations/create-admin.validation';

export type CreateAdminDto = z.infer<typeof createAdminValidationSchema>;
