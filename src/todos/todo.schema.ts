import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { v4 as uuidv4 } from 'uuid';

export type todoDocument = Todo & Document;
export const TodoSchemaName = 'todo';

@Schema()
export class Todo {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  completed: boolean;

  @Prop({ type: String, ref: 'user' })
  userId: User;
}

export const todoSchema = SchemaFactory.createForClass(Todo);
