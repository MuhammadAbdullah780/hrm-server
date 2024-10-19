/**
 * @desc designed to restrict user to access some of their protected admin endpoints
 */

import { SetMetadata } from '@nestjs/common';

export const IS_RESTRICTED_TO_USER = 'isRestrictedToUser';

export const IsRestrictedToUser = (isRestricted: boolean) =>
  SetMetadata(IS_RESTRICTED_TO_USER, isRestricted);
