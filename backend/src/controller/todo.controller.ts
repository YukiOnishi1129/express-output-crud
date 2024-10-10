import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import { sendOK, sendError } from './response';
import { getTodoList, getTodoById } from '@/service/todo.service';

export const getTodoListHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(', ');
    sendError(res, 400, errorMessage);
    return;
  }
  try {
    const todoList = await getTodoList();
    sendOK(res, todoList);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Internal Server Error');
  }
};

export const getTodoByIdHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(', ');
    sendError(res, 400, errorMessage);
    return;
  }
  try {
    const todo = await getTodoById(Number(req.params.id));
    if (!todo) {
      sendError(res, 404, 'Todo not found');
      return;
    }
    sendOK(res, todo);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Internal Server Error');
  }
};
