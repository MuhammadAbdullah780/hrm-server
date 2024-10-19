// src/pipes/zod-validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { AppException } from '../exceptions/app-exception';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      // Validate the value against the Zod schema
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        //
        // const customErrors = error.errors.map((err) => err.message).join(', ');

        //
        throw new AppException({
          msg: error?.errors?.[0]?.message,
          details: error,
        });
      }

      //
      throw error;
    }
  }
}
