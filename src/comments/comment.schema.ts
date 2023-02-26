import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'src/posts/post.scehma';
import { v4 as uuidv4 } from 'uuid';

export type commentDocument = Comment & Document;
export const CommentSchemaName = 'comment';

@Schema()
export class Comment {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  body: string;

  @Prop()
  email: string;

  @Prop({ type: String, ref: 'post' })
  postId: Post;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
