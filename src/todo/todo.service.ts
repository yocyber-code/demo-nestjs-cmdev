import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { randomUUID } from 'crypto';
import { promises } from 'dns';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  addTodo(title: string, subtitle: string): string {
    console.log(title, subtitle);
    const todo = new Todo();
    todo.id = randomUUID();
    todo.title = title;
    todo.subtitle = subtitle;
    this.todos.push(todo);
    return title + subtitle;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  removeTodoById(id: string): void {
    const found = this.todos.find((item: Todo) => {
      return item.id === id;
    });
    if (!found) {
      throw new NotFoundException(`Todo With ${id} not found`);
    }
    this.todos = this.todos.filter((item: Todo) => {
      return item.id !== id;
    });
  }
}
