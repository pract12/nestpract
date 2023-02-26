import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { v4 as uuidv4 } from 'uuid';

export type postDocument = Post & Document;
export const PostSchemaName = 'post';

@Schema()
export class Post {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: String, ref: 'user' })
  userId: User;
}

export const postSchema = SchemaFactory.createForClass(Post);
