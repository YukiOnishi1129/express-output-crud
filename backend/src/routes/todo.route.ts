import { Router } from 'express';

import {
  validateTodoById,
  getTodoListHandler,
  getTodoByIdHandler,
} from '@/controller/todo.controller';

const todoRouter = Router();

todoRouter.get('/', getTodoListHandler);
todoRouter.get('/:id', validateTodoById, getTodoByIdHandler);

export default todoRouter;
