import { DataSource } from 'typeorm';
import { Express } from 'express';
import { setTodoRoute } from './todo';

export const setApiRoute = (app: Express, db: DataSource) => {
  setTodoRoute(app, db);

  return app._router;
};
