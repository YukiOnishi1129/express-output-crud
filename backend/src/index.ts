import 'reflect-metadata';
import 'tsconfig-paths/register';
import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { AppDataSource } from '@/config/appDataSource';
import apiRouter from '@/routes';
import { errorHandler } from '@/middleware/errorHandler';

dotenv.config();

export const API_BASE_URL = '/api';

const start = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  const corsOptions = {
    origin: ['http://localhost:3000'], // 許可したいドメイン
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 許可したいHTTPメソッド
    allowedHeaders: ['Content-Type', 'Authorization'], // 許可したいヘッダー
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(errorHandler);

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
