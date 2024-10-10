import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import { sendSuccess, sendError } from './response';
import {
  getTodoList,
  getTodoById,
  GetTodoListParam,
} from '@/service/todo.service';

export const validateTodoById = [
  check('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

export const getTodoListHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg as string);
    sendError(res, 400, errorMessage);
    return;
  }
  const param: GetTodoListParam = {};

  const { keyword } = req.query;
  if (keyword && typeof keyword === 'string') {
    param.keyword = keyword;
  }

  try {
    const todoList = await getTodoList(param);
    sendSuccess(res, 200, todoList);
  } catch (error) {
    console.error(error);
    sendError(res, 500);
  }
};

export const getTodoByIdHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg as string);
    sendError(res, 400, errorMessage);
    return;
  }
  try {
    const todo = await getTodoById(Number(req.params.id));
    console.log('🔥');
    console.log(todo);
    if (!todo) {
      sendError(res, 404);
      return;
    }
    sendSuccess(res, 200, todo);
  } catch (error) {
    console.error(error);
    sendError(res, 500);
  }
};
