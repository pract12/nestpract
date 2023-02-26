import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchemaName, postSchema } from './post.scehma';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PostSchemaName,
        schema: postSchema,
      },
    ]),
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
