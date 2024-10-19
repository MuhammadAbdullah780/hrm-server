import { SetMetadata } from '@nestjs/common';
import { AppClaimsEnum } from '../enums/app-claims';

export const CLAIMS_KEY = 'claims';

export const Claims = (...claims: AppClaimsEnum[]) =>
  SetMetadata(CLAIMS_KEY, claims);
