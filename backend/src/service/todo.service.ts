import { findAllTodo, findTodoById } from '@/repository/todo.repository';

export const getTodoList = async () => {
  return await findAllTodo();
};

export const getTodoById = async (id: number) => {
  return await findTodoById(id);
};
