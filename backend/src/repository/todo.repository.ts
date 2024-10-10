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

export const createTodo = async (todo: Todo) => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  try {
    return await todoRepository.insert(todo);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateTodo = async (todo: Todo) => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  try {
    return await todoRepository.save(todo);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteTodo = async (id: number) => {
  const db = AppDataSource.getInstance();
  const todoRepository = db.getRepository(Todo);
  try {
    return await todoRepository.delete(id);
  } catch (error) {
    console.error(error);
    return error;
  }
};
