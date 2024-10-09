import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { check, validationResult } from 'express-validator';
import { Todo } from '../domain/entity/todo';
import { sendOK, sendError } from './response';

export const getTodoList = (db: DataSource) => {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoRepository = db.getRepository(Todo);
      const todoList = await todoRepository.find();
      return sendOK(res, todoList);
    } catch (error) {
      console.error(error);
      return sendError(res, 500, 'Internal Server Error');
    }
  };
};
