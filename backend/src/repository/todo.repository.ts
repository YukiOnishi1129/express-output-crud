import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';

export const findAllTodo = async () => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  return await todoRepository.find();
};
