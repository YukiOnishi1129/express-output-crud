import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/shared/errors/httpError';
import { sendError } from '@/shared/response/sendResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // HttpError かどうかを判定
  if (err instanceof HttpError) {
    sendError(res, err.statusCode, [err.message]);
    return;
  }

  // その他の予期しないエラー
  console.error('Unexpected error:', err);
  sendError(res, 500);
  return;
};
