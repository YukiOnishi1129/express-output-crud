import { findAllTodo } from '@/repository/todo.repository';

export const getTodoList = async () => {
  return await findAllTodo();
};
