// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {repository, Filter, Count, CountSchema, Where} from '@loopback/repository';
import {TodoListRepository} from '../repositories';
import { post, param, requestBody, patch, getWhereSchemaFor, del, get } from '@loopback/rest';
import { Todo } from '../models/todo.model';

export class TodoListTodoController {
  constructor(@repository(TodoListRepository) protected todoListRepo: TodoListRepository,) {}

  @post('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo model instance',
        content: {'application/json': {schema: {'x-ts-type': Todo}}},
      },
    },
  })
  async create(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<Todo> {
    return await this.todoListRepo.todos(id).create(todo);
  }

  @get('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: "Array of Todo's belonging to TodoList",
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Todo}},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return await this.todoListRepo.todos(id).find(filter);
  }

  @patch('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() todo: Partial<Todo>,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return await this.todoListRepo.todos(id).patch(todo, where);
  }

  @del('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return await this.todoListRepo.todos(id).delete(where);
  }
}