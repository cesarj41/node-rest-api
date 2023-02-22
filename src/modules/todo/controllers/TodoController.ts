import { DbContext } from '@src/modules/data/DbContext';
import { AppError } from '@src/util';
import { JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { CreateTodoModel } from '../models/CreateTodoModel';
import { TodoModel } from '../models/TodoModel';

@JsonController('/todos')
@Service()
export class TodoController {
  @Inject()  
  private ctx: DbContext;

  @Get()
  @OpenAPI({ summary: 'Return a list of todo' })
  @ResponseSchema(TodoModel, { isArray: true })
  async getAll(): Promise<TodoModel[]> {
    const todos = await this.ctx.db.todo.findMany();
    return todos.map(t => ({
      id: t.id.toString(),
      completed: t.completed,
      name: t.content,
    }));
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return todo by id' })
  @ResponseSchema(TodoModel)
  async getOne(@Param('id') id: number) {
    const todo = await this.ctx.db.todo.findUnique({ where: { id }});

    if (!todo) {
      throw new NotFoundError("resource not found.");
    }
    return { 
      id, 
      name: todo.content, 
      completed: todo.completed, 
    };
  }

  @Post()
  @OpenAPI({ summary: 'Creates a todo' })
  @ResponseSchema(TodoModel)
  async createTodo(@Body() todo: CreateTodoModel) {
    const res = await this.ctx.db.todo.create({ data: {
      content: todo.content,
      completed: todo.completed ?? false,
      authorId: "Cesar por ahora",
    }});
    return {
      id: res.id,
      content: res.content,
      completed: res.completed,
      authorId: res.authorId,
    };
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a todo...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing todo...';
  }
}