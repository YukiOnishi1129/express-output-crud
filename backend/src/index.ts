import 'reflect-metadata';
import 'tsconfig-paths/register';
import * as dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from '@/config/appDataSource';
import apiRouter from '@/routes';

dotenv.config();

export const API_BASE_URL = '/api';

const start = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  AppDataSource.initialize()
    .then(() => {
      // ルーティング設定
      app.use(API_BASE_URL, apiRouter);

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error('Error during Data Source initialization:', error);
    });
};

start();
