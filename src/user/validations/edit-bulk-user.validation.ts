import { z } from 'zod';
import { BullkUserEditMode } from '../typings';
import { EmploymentStatus } from 'src/db/enums/user';

export const bulkEditUserValidationSchema = z
  .object({
    mode: z.nativeEnum(BullkUserEditMode),
    job_title: z.string().optional(),
    // ! later on claim should managed
    claim: z.string().optional(),
    employment_status: z
      .object({
        title: z.nativeEnum(EmploymentStatus),
        effective_date: z.date().optional().default(new Date()),
      })
      .optional(),
    ids_to_deactivate: z.array(z.string()).optional(),
    user_ids: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    const mode = data.mode as BullkUserEditMode;

    switch (mode) {
      case BullkUserEditMode.ASSIGN_JOB_TITLE:
        if (!data.job_title) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['job_title'],
            message: 'Job title is required when mode is ASSIGN_JOB_TITLE',
          });
        }
        break;

      case BullkUserEditMode.ASSIGN_CLAIM:
        if (!data.claim) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['claim'],
            message: 'Claim is required when mode is ASSIGN_CLAIM',
          });
        }
        break;

      case BullkUserEditMode.CHANGE_EMPLOYMENT_STATUS:
        if (!data.employment_status) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['employment_status'],
            message:
              'Employment status is required when mode is CHANGE_EMPLOYMENT_STATUS',
          });
        }
        break;

      case BullkUserEditMode.DEACTIVATE_ACCOUNTS:
        if (!data.ids_to_deactivate || data.ids_to_deactivate.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['ids_to_deactivate'],
            message: 'At least one account must be selected for deactivation',
          });
        }
        break;

      default:
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['mode'],
          message: 'Invalid mode selected',
        });
    }
  });
