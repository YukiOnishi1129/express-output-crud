import { Express } from 'express';

import { getTodoList } from '../controller/todo';
import { DataSource } from 'typeorm';

export const setTodoRoute = (app: Express, db: DataSource) => {
  app._router.get('/todos', getTodoList(db));
};
