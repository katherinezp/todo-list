import {Entity, model, property} from '@loopback/repository';

import {hasMany} from '@loopback/repository'; //verificar importacion
import {Todo, TodoWithRelations} from './todo.model'; //importación modelo todo

@model({settings: {}})
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Todo)
  todos?: Todo[]; //se crea atributo todos que viene desde model Todo

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  todos?: TodoWithRelations[];
}

export type TodoListWithRelations = TodoList & TodoListRelations;
