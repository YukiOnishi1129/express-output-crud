import { FindManyOptions, Like } from 'typeorm';
import {
  findAllTodo,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '@/repository/todo.repository';
import { Todo } from '@/domain/entity/todo.entity';

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

export type CreateNewTodoParam = {
  title: string;
  content: string;
};

export const createNewTodo = async ({ title, content }: CreateNewTodoParam) => {
  const todo = new Todo();
  todo.title = title;
  todo.content = content;
  return await createTodo(todo);
};

export type UpdateExistingTodoParam = {
  id: number;
  title: string;
  content: string;
};

export const updateExistingTodo = async ({
  id,
  title,
  content,
}: UpdateExistingTodoParam) => {
  const todo = await findTodoById(id);
  if (!todo) {
    return new Error('Todo not found');
  }
  todo.title = title;
  todo.content = content;
  return await updateTodo(todo);
};

export const deleteExistingTodo = async (id: number) => {
  const todo = await findTodoById(id);
  if (!todo) {
    return new Error('Todo not found');
  }
  return await deleteTodo(id);
};
