import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_MODEL_OPTIONS, REQUIRED_FIELD_MSG } from '../constants';
import { AccountStatus, Gender } from '../enums/shared';
import {
  EmploymentStatus as EmploymentStatusEnum,
  EmploymentType as EmploymentTypeEnum,
  WorkType,
} from '../enums/user';

/**
 * Sub Schemas
 */
@Schema()
class EmploymentType {
  @Prop({ type: String, enum: EmploymentTypeEnum })
  title: EmploymentTypeEnum;

  @Prop({ type: Date, default: new Date() })
  effective_date: Date;
}

@Schema()
class EmploymentStatus {
  @Prop({ type: String, enum: EmploymentStatusEnum })
  title: EmploymentStatusEnum;

  @Prop({ type: Date, default: new Date() })
  effective_date: Date;
}

@Schema()
class Education {
  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  degree: string;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  program: string;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  institute: string;

  @Prop({ type: Date, required: [true, REQUIRED_FIELD_MSG] })
  start_date: Date;

  @Prop({ type: Date, required: [true, REQUIRED_FIELD_MSG] })
  end_date: Date;
}

@Schema()
class Experience {
  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  company_name: string;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG], enum: WorkType })
  work_site: WorkType;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  designation: string;

  @Prop({
    type: String,
    required: [true, REQUIRED_FIELD_MSG],
    min: 10,
    max: 10000,
  })
  description: string;

  @Prop({
    type: [String],
    required: [true, REQUIRED_FIELD_MSG],
  })
  skills: string[];

  @Prop({ type: Date, required: [true, REQUIRED_FIELD_MSG] })
  start_date: Date;

  @Prop({ type: Date, required: [true, REQUIRED_FIELD_MSG] })
  end_date: Date;
}

/**
 * Main Schema
 */
@Schema({ collection: 'users', ...DEFAULT_MODEL_OPTIONS })
export class User {
  @Prop({ required: [true, REQUIRED_FIELD_MSG], min: 3 })
  name: string;

  @Prop({ required: [true, REQUIRED_FIELD_MSG], unique: true })
  email: string;

  @Prop({ type: Date })
  birth_date?: Date;

  @Prop({ required: [true, REQUIRED_FIELD_MSG], select: false })
  password: string;

  @Prop({ type: Date, default: new Date() })
  hire_date?: Date;

  @Prop({ type: String, enum: Gender })
  gender?: Gender;

  @Prop({ type: String })
  profile_picture?: string;

  @Prop({ type: String })
  phone_number?: string;

  @Prop({ type: String, min: 10, max: 10000 })
  address?: string;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  job_title: string;

  @Prop({ type: [Education], default: [] })
  education?: Education[];

  @Prop({ type: [Experience], default: [] })
  experience?: Experience[];

  @Prop({ type: [EmploymentType] })
  employment_type?: EmploymentType[];

  @Prop({ type: [EmploymentStatus] })
  employment_status?: EmploymentStatus[];

  @Prop({ default: 8 })
  work_hours: number;

  @Prop({ type: String, enum: WorkType, default: WorkType.ON_SITE })
  work_type: string;

  @Prop({ type: Date, default: new Date() })
  creation_date: Date;

  @Prop({ type: String, enum: AccountStatus, default: AccountStatus.ACTIVE })
  account_status: AccountStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
