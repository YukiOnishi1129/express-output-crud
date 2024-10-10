import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { getTodoListHandler } from '@/controller/todo.controller';
import { sendSuccess, sendError } from '@/shared/response/sendResponse';
import { getTodoList } from '@/service/todo.service';

describe('Test todo.service ', () => {
  afterEach(async () => {
    const todoRepo = AppDataSource.getInstance().getRepository(Todo);
    await todoRepo.clear();
  });
  describe('getTodoList', () => {
    it('should return an empty todo list on success', async () => {
      const todoList = await getTodoList({});
      expect(todoList).toEqual([]);
    });
  });
});
