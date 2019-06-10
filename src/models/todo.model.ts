import {Entity, model, property} from '@loopback/repository';
import { TodoListWithRelations, TodoList } from './todo-list.model';

@model({settings: {}})
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property()
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todoList?: TodoListWithRelations;

}

export type TodoWithRelations = Todo & TodoRelations;
