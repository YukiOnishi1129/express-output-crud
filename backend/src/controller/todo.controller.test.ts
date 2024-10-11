import { Request, Response, NextFunction } from 'express';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';

import { getTodoListHandler } from '@/controller/todo.controller';
import { sendSuccess } from '@/shared/response/sendResponse';

jest.mock('@/shared/response/sendResponse');

let req: Request;
let res: Response;
let next: NextFunction;

describe('【Controller Test Todo】 ', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
    jest.clearAllMocks();
  });
  afterEach(async () => {
    const todoRepo = AppDataSource.getInstance().getRepository(Todo);
    await todoRepo.clear();
  });

  describe('【getTodoListHandler】', () => {
    it('Success: : get 0 data', async () => {
      await getTodoListHandler(req, res, next);
      expect(sendSuccess).toHaveBeenCalledWith(res, 200, []);
    });

    it('Success: get data', async () => {
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        id: 1,
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });

      await getTodoListHandler(req, res, next);

      expect(sendSuccess).toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            title: 'Test Todo',
            content: 'This is a test todo item.',
          }),
        ]),
      );
    });

    it('Success: get searched data', async () => {
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

      req.query = { keyword: 'Test' };
      await getTodoListHandler(req, res, next);

      expect(sendSuccess).toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining<Todo>([
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

      expect(sendSuccess).not.toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining<Todo>([
          expect.objectContaining({
            id: 2,
            title: 'eest Todo2',
            content: 'This is a test todo item2.',
          }),
        ]),
      );
    });
  });
});
