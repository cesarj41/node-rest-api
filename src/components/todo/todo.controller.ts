import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TodoModel } from './todo.models';

@JsonController('/todos')
export class TodoController {

  @Get()
  @OpenAPI({ summary: 'Return a list of todo' })
  @ResponseSchema(TodoModel, { isArray: true })
  getAll(): TodoModel[] {
    return [
      {id: "1", name: "Work Hard 1", completed: false},
      {id: "2", name: "Work Hard 2", completed: false},
      {id: "3", name: "Work Hard 3", completed: false},
      {id: "4", name: "Work Hard 4", completed: false},
      {id: "5", name: "Work Hard 5", completed: false},
    ];
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return todo by id' })
  @ResponseSchema(TodoModel)
  getOne(@Param('id') id: string): TodoModel {
    return {id, name: `Work Hard ${id}`, completed: false};
  }

  @Post()
  post(@Body() user: any) {
    return 'Saving todo...';
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