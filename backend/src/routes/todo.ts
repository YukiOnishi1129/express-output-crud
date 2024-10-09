import { Router } from 'express';
import { AppDataSource } from '../config/dataSource';
import { Todo } from '../domain/entity/todo';

const router = Router();

// GET /todos - 全てのTODOリストを取得
router.get('/todos', async (req, res) => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
