import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { sendOK, sendError } from './response';
import { getTodoList } from '@/service/todo.service';

export const getTodoListHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(', ');
    sendError(res, 400, errorMessage);
  }
  try {
    const todoList = await getTodoList();
    sendOK(res, todoList);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Internal Server Error');
  }
};
