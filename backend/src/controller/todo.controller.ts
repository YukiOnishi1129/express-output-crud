import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import { sendSuccess, sendError } from './response';
import {
  getTodoList,
  getTodoById,
  GetTodoListParam,
  createNewTodo,
  CreateNewTodoParam,
  updateExistingTodo,
  UpdateExistingTodoParam,
  deleteExistingTodo,
} from '@/service/todo.service';

export const validateTodoById = [
  check('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

export const validateCreateTodo = [
  check('title')
    .notEmpty()
    .withMessage('title must not be empty')
    .isLength({ max: 30 })
    .withMessage('title must not exceed 30 characters'),
  check('content').notEmpty().withMessage('content must not be empty'),
];

export const validateUpdateTodo = [
  check('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  check('title')
    .notEmpty()
    .withMessage('title must not be empty')
    .isLength({ max: 30 })
    .withMessage('title must not exceed 30 characters'),
  check('content').notEmpty().withMessage('content must not be empty'),
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

export const createNewTodoHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg as string);
    sendError(res, 400, errorMessage);
    return;
  }
  const param: CreateNewTodoParam = {
    title: req.body.title,
    content: req.body.content,
  };

  try {
    const todo = await createNewTodo(param);
    if (!todo) {
      sendError(res, 404);
      return;
    }
    sendSuccess(res, 201, todo);
  } catch (error) {
    console.error(error);
    sendError(res, 500);
  }
};

export const updateTodoHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg as string);
    sendError(res, 400, errorMessage);
    return;
  }
  const param: UpdateExistingTodoParam = {
    id: Number(req.params.id),
    title: req.body.title,
    content: req.body.content,
  };

  try {
    const todo = await updateExistingTodo(param);
    if (todo instanceof Error) {
      sendError(res, 404);
      return;
    }
    sendSuccess(res, 200, todo);
  } catch (error) {
    console.error(error);
    sendError(res, 500);
  }
};

export const validateDeleteTodo = [
  check('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

export const deleteTodoHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg as string);
    sendError(res, 400, errorMessage);
    return;
  }
  try {
    const todo = await deleteExistingTodo(Number(req.params.id));
    if (todo instanceof Error) {
      sendError(res, 404);
      return;
    }
    sendSuccess(res, 204);
  } catch (error) {
    console.error(error);
    sendError(res, 500);
  }
};
