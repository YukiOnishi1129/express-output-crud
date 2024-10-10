import { FindManyOptions, Like } from 'typeorm';
import { findAllTodo, findTodoById } from '@/repository/todo.repository';

export type GetTodoListParam = {
  keyword?: string;
};

export const getTodoList = async ({ keyword }: GetTodoListParam) => {
  const options: FindManyOptions = {};
  if (keyword) {
    options.where = {
      title: Like(`%${keyword}%`),
    };
  }
  return await findAllTodo(options);
};

export const getTodoById = async (id: number) => {
  return await findTodoById(id);
};
