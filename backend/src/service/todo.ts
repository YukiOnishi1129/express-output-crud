import { findAllTodo } from '../repository/todo';

export const getTodoList = async () => {
  return await findAllTodo();
};
