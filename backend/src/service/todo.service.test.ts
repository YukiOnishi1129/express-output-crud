import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';

import {
  createNewTodo,
  getTodoById,
  getTodoList,
} from '@/service/todo.service';
import { HttpError } from '@/shared/errors/httpError';

describe('【Service Test Todo】 ', () => {
  afterEach(async () => {
    const todoRepo = AppDataSource.getInstance().getRepository(Todo);
    await todoRepo.clear();
  });
  describe('【getTodoList】', () => {
    it('Success: get 0 data', async () => {
      const todoList = await getTodoList({});
      expect(todoList).toEqual([]);
    });
    it('Success: get data', async () => {
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        id: 1,
        title: 'Test Todo1',
        content: 'This is a test todo item1.',
      });
      await todoRepo.save({
        id: 2,
        title: 'Test Todo2',
        content: 'This is a test todo item2.',
      });

      const todoList = await getTodoList({});
      expect(todoList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            title: 'Test Todo1',
            content: 'This is a test todo item1.',
          }),
          expect.objectContaining({
            id: 2,
            title: 'Test Todo2',
            content: 'This is a test todo item2.',
          }),
        ]),
      );
    });
    it('Success: get data with keyword', async () => {
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        id: 1,
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });
      await todoRepo.save({
        id: 2,
        title: 'eest Todo2',
        content: 'This is a test todo item2.',
      });
      await todoRepo.save({
        id: 3,
        title: 'Test Todo3',
        content: 'This is a test todo item3.',
      });

      const todoList = await getTodoList({ keyword: 'Test' });
      expect(todoList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            title: 'Test Todo',
            content: 'This is a test todo item.',
          }),
          expect.objectContaining({
            id: 3,
            title: 'Test Todo3',
            content: 'This is a test todo item3.',
          }),
        ]),
      );
    });
  });

  describe('【getTodoById】', () => {
    it('Success: get data by id', async () => {
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        id: 1,
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });

      const todo = await getTodoById(1);
      expect(todo).toMatchObject({
        id: 1,
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });
    });
    it('Error: get data by id', async () => {
      try {
        await getTodoById(1);
      } catch (error) {
        expect(error).toEqual(new HttpError(404, 'Todo not found'));
      }
    });
  });

  describe('【createNewTodo】', () => {
    it('Success: create new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        content: 'This is a test todo item.',
      };
      const todo = await createNewTodo(newTodo);
      expect(todo).toMatchObject({
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });
    });
  });
});
