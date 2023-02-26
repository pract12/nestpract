import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto } from './dto/todo.dto';
import { todoDocument } from './todo.schema';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todo')
    private readonly todoModel: Model<todoDocument>,
  ) {}

  async createTodo(dto: TodoDto): Promise<any> {
    return this.todoModel.create(dto);
  }

  async get(id: string): Promise<TodoDto> {
    return this.todoModel.findById({ _id: id }).populate('postId');
  }

  async todoUpdate(id: string, dto: UpdateTodoDto): Promise<any> {
    return this.todoModel.findOneAndUpdate({ _id: id }, dto);
  }

  async delete(id: string): Promise<any> {
    return this.todoModel.deleteOne({ _id: id });
  }
}
