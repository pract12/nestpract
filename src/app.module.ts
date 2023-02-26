import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environment/environment';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CommentModule,
    TodoModule,
    MongooseModule.forRoot(environment.mongodb),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
