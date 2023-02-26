import { Module } from '@nestjs/common';
import { CommentSchemaName, commentSchema } from './comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommentSchemaName,
        schema: commentSchema,
      },
    ]),
  ],
  providers: [CommentService],
  exports: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
