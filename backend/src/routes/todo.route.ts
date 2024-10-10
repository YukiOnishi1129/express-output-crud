import { Router } from 'express';

import {
  getTodoListHandler,
  getTodoByIdHandler,
} from '@/controller/todo.controller';

const todoRouter = Router();

todoRouter.get('/', getTodoListHandler);
todoRouter.get('/:id', getTodoByIdHandler);

export default todoRouter;
