import { DbContext } from "@src/modules/data/DbContext";
import { BadRequestError, NotFoundError } from "@src/util";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Service } from "typedi";
import { CreateTodoModel } from "./todo.models";


@Service()
export class TodoController {
  private ctx: DbContext;

  constructor(dbContext: DbContext) {
    this.ctx = dbContext;
  }
  
  async fetchTodoList(_: Request, res: Response) {
    const todos = await this.ctx.db.todo.findMany();
    res.send(todos);
  }

  async fetchTodo(req: Request, res: Response) {
    const todo = await this.ctx.db.todo.findUnique({ 
      where: { id: Number(req.params.id) }, 
    });

    if (!todo) {
      throw new NotFoundError();
    }
    res.send(todo);
    
  }

  async createTodo(req: Request, res: Response) {
    const create = new CreateTodoModel();
    create.name = req.body.name;
    create.completed = req.body.completed;

    const errors = await validate(create);

    if (errors.length > 0) {
      throw new BadRequestError(errors.toString());
    }

    const todo = await this.ctx.db.todo.create({
      data: {
        content: create.name,
        completed: create.completed ?? false,
        authorId: "Cesar por ahora",
      },
    });

    res.send(todo);
  }

  updateTodo() {
    return "Updating a todo...";
  }

  deleteTodo() {
    return "Removing todo...";
  }
}
