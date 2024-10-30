import { z } from 'zod';
import { createUserValidationSchema } from './validations/create-user.validation';
import { deleteBulkUserValidationSchema } from './validations/delete-bulk.validation';
import { bulkEditUserValidationSchema } from './validations/edit-bulk-user.validation';

export enum BullkUserEditMode {
  ASSIGN_JOB_TITLE = 'ASSIGN_JOB_TITLE',
  ASSIGN_CLAIM = 'ASSIGN_CLAIM',
  CHANGE_EMPLOYMENT_STATUS = 'CHANGE_EMPLOYMENT_STATUS',
  DEACTIVATE_ACCOUNTS = 'DEACTIVATE_ACCOUNTS',
}

export enum IndividualUserEditMode {
  CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
  ASSIGN_JOB_TITLE = 'ASSIGN_JOB_TITLE',
  CHANGE_WORK_TYPE = 'CHANGE_WORK_TYPE',
  MODIFY_WORK_HOURS = 'MODIFY_WORK_HOURS',
  DEACTIVATE_ACCOUNT = 'DEACTIVATE_ACCOUNT',
  CHANGE_EMPLOYMENT_STATUS = 'CHANGE_EMPLOYMENT_STATUS',
  CHANGE_EMPLOYMENT_TYPE = 'CHANGE_EMPLOYMENT_TYPE',
}

export type CreateUserDto = z.infer<typeof createUserValidationSchema>;
export type DeleteBulkUserDto = z.infer<typeof deleteBulkUserValidationSchema>;
export type EditBulkUserDto = z.infer<typeof bulkEditUserValidationSchema>;
