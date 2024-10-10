import { Router } from 'express';

import { getTodoListHandler } from '@/controller/todo.controller';

const todoRouter = Router();

todoRouter.get('/', getTodoListHandler);

export default todoRouter;
