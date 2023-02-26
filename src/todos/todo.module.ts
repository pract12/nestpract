import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoSchemaName, todoSchema } from './todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TodoSchemaName,
        schema: todoSchema,
      },
    ]),
  ],
  providers: [TodoService],
  exports: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
