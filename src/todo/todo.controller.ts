import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  AddTodo(
    @Body() body: { title: string; subtitle: string },
  ) {
    return this.todoService.addTodo(body.title, body.subtitle);
  }

  @Delete('/:id')
  removeTodo(@Param('id') id: string) {
    this.todoService.removeTodoById(id);
  }
}
