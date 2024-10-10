import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';
import { FindManyOptions } from 'typeorm';

export const findAllTodo = async (options?: FindManyOptions<Todo>) => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  return await todoRepository.find(options);
};

export const findTodoById = async (id: number) => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  return await todoRepository.findOne({
    where: {
      id,
    },
  });
};
