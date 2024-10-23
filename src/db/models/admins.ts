import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { DEFAULT_MODEL_OPTIONS, REQUIRED_FIELD_MSG } from '../constants';
import { AccountStatus, Gender } from '../enums/shared';

@Schema({ collection: 'admins', ...DEFAULT_MODEL_OPTIONS })
export class Admin {
  @Prop({ required: [true, REQUIRED_FIELD_MSG] })
  name: string;

  @Prop({ type: String })
  phone_number?: string;

  @Prop({ type: Date, default: new Date() })
  creation_date: Date;

  @Prop({ type: String, enum: AccountStatus, default: AccountStatus.ACTIVE })
  account_status: AccountStatus;

  @Prop({ type: Date })
  last_login?: Date;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG], unique: true })
  email: string;

  @Prop({ type: String })
  profile_picture?: string;

  @Prop({ type: String, enum: Gender })
  gender?: Gender;

  @Prop({ type: Date })
  birth_date?: Date;

  @Prop({ type: String, min: 10, max: 10000 })
  address?: string;

  @Prop({ type: String, required: [true, REQUIRED_FIELD_MSG] })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
