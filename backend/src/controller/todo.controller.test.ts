import { AppDataSource } from '@/config/appDataSource';
import { Todo } from '@/domain/entity/todo.entity';
import { Request, Response, NextFunction } from 'express';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { getTodoListHandler } from '@/controller/todo.controller';
import { sendSuccess } from '@/shared/response/sendResponse';

jest.mock('@/shared/response/sendResponse');

let req: Request;
let res: Response;
let next: NextFunction;

describe('Test todo.controller ', () => {
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

  describe('getTodoListHandler', () => {
    it('should return an empty todo list on success', async () => {
      // 初期状態では空のTodoリストが返る
      await getTodoListHandler(req, res, next);

      expect(sendSuccess).toHaveBeenCalledWith(res, 200, []);
    });

    it('should return a todo list with items', async () => {
      // テスト用データをDBに挿入
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });

      await getTodoListHandler(req, res, next);

      // 正しい結果が返されるかを確認
      expect(sendSuccess).toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Test Todo',
            content: 'This is a test todo item.',
          }),
        ]),
      );
    });

    it('should return a search todo list with items', async () => {
      // テスト用データをDBに挿入
      const todoRepo = AppDataSource.getInstance().getRepository(Todo);
      await todoRepo.save({
        title: 'Test Todo',
        content: 'This is a test todo item.',
      });
      await todoRepo.save({
        title: 'eest Todo2',
        content: 'This is a test todo item2.',
      });
      await todoRepo.save({
        title: 'Test Todo3',
        content: 'This is a test todo item3.',
      });

      req.query = { keyword: 'Test' };
      await getTodoListHandler(req, res, next);

      // 正しい結果が返されるかを確認
      expect(sendSuccess).toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining<Todo>([
          expect.objectContaining({
            title: 'Test Todo',
            content: 'This is a test todo item.',
          }),
          expect.objectContaining({
            title: 'Test Todo3',
            content: 'This is a test todo item3.',
          }),
        ]),
      );

      //   想定外のデータが含まれていないかを確認
      expect(sendSuccess).not.toHaveBeenCalledWith(
        res,
        200,
        expect.arrayContaining<Todo>([
          expect.objectContaining({
            title: 'eest Todo2',
            content: 'This is a test todo item2.',
          }),
        ]),
      );
    });
  });
});
