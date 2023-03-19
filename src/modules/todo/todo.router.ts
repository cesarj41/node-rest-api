import express from "express";
import { Container } from 'typedi';
import { TodoController } from "./todo.controller";

const router =  express.Router();
const todoController = Container.get(TodoController);

router.get("/", todoController.fetchTodoList.bind(todoController));
router.get("/:id", todoController.fetchTodo.bind(todoController));
router.post("/", todoController.createTodo.bind(todoController));


export default router;

