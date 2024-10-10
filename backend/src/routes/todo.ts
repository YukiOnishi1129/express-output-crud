import { Router, Request, Response, RequestHandler } from 'express';

import { getTodoListHandler } from '../controller/todo';

const todoRouter = Router();

todoRouter.get('/', getTodoListHandler);

export default todoRouter;
