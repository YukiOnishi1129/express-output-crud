import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/appDataSource';
import { setApiRoute } from './routes';

dotenv.config();

const start = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // ルートの設定
  //   app.use('/api', todoRoutes);

  AppDataSource.initialize()
    .then((db) => {
      // ルーティング設定
      setApiRoute(app, db);

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error('Error during Data Source initialization:', error);
    });
};

start();
