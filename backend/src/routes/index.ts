import { Router } from 'express';
import todoRouter from './todo';

const apiRouter = Router();

// 各ドメインのルーティングを設定
apiRouter.use('/todos', todoRouter);

export default apiRouter;
