import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateType } from 'src/shared/types/shared';
import { DEFAULT_MODEL_TIMESTAMP } from '../constants/timestamp';
import { Degree } from '../enums/user';
import { REQ_FIELD_MSG } from '../constants/models';

/**
 * Nested Schemas
 */

// Education
class Education {
  @Prop({ type: String, enum: [Degree, 'Invalid value for {VALUE}'] })
  degree: Degree;

  @Prop({ type: String })
  program: string;

  @Prop({ type: String })
  institution: string;

  @Prop({ type: String })
  start_year: string;

  @Prop({ type: String })
  end_year: string;
}

// Experience
class Experience {
  @Prop({ type: String })
  company_name: string;

  @Prop({ type: String })
  work_side: string;

  @Prop({ type: String })
  work_type: string;

  @Prop({ type: String })
  designation: string;

  @Prop({ type: Date })
  start_date: DateType;

  @Prop({ type: Date })
  end_date: DateType;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], default: [] })
  skills: string[];
}

// Employment Type
class EmploymentType {
  @Prop({ type: String })
  title: string;

  @Prop({ type: Date })
  effective_date: DateType;
}

// Employment Status
class EmploymentStatus {
  @Prop({ type: String })
  title: string;

  @Prop({ type: Date })
  effective_date: DateType;
}

/**
 * Schema
 */
@Schema({ ...DEFAULT_MODEL_TIMESTAMP })
export class User {
  @Prop({
    type: String,
    minlength: [3, 'This field contains minimum of 3 characters'],
    required: [true, REQ_FIELD_MSG],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, REQ_FIELD_MSG],
    unique: true,
  })
  email: string;

  @Prop({ type: Date })
  birth_date: DateType;

  @Prop({ type: String, select: false, required: [true, REQ_FIELD_MSG] })
  password: string;

  @Prop({ type: Date, default: new Date() })
  hire_date: DateType;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  profile_picture: string;

  @Prop({ type: String })
  timezone: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  street_address: string;

  @Prop({ type: [Education], default: [] })
  education: Education[];

  @Prop({ type: [Experience], default: [] })
  experience: Experience[];

  @Prop({ type: String, required: [true, REQ_FIELD_MSG] })
  job_title: string;

  @Prop({ type: [EmploymentType] })
  employment_type: EmploymentType[];

  @Prop({ type: [EmploymentStatus] })
  employment_status: EmploymentStatus[];

  @Prop({ type: Boolean, default: false })
  is_deactivated: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
