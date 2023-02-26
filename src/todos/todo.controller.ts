import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('user/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() dto: TodoDto): Promise<any> {
    return this.todoService.createTodo(dto);
  }

  @Get(':id')
  async getTodo(@Param('id') id: string): Promise<TodoDto> {
    return this.todoService.get(id);
  }

  @Patch(':id')
  async updateTodo(
    @Body() dto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<UpdateTodoDto> {
    return this.todoService.todoUpdate(id, dto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.todoService.delete(id);
  }
}
