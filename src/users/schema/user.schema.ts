import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type userDocument = User & Document;
export const UserSchemaName = 'user';

@Schema()
export class User {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isEmailValid: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
