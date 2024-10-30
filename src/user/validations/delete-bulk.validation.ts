import { z } from 'zod';

export const deleteBulkUserValidationSchema = z.object({
  user_ids: z.array(z.string()),
});
