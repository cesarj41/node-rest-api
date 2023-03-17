import { DbContext } from "@src/modules/data/DbContext";
import { NotFoundError } from "@src/util";
import { Request, Response } from "express";
import { Service } from "typedi";


@Service()
export class TodoController {
  private ctx: DbContext;

  constructor(public dbContext: DbContext) {
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

  createTodo(req: Request, res: Response) {
    res.send(req.body);
    // return await this.ctx.db.todo.create({
    //   data: {
    //     content: todo.content,
    //     completed: todo.completed ?? false,
    //     authorId: "Cesar por ahora",
    //   },
    // });
  }

  updateTodo() {
    return "Updating a todo...";
  }

  deleteTodo() {
    return "Removing todo...";
  }
}
