import { Response } from 'express';

interface IResponseSchema<T = any> {
  data?: T;
  status: number;
}

export const respondWithSchema = <T>(
  response: IResponseSchema<T>,
): IResponseSchema<T> => response;

export const sendOK = <T>(res: Response, data: T | null = null) =>
  res.status(200).send(
    respondWithSchema({
      data,
      status: 200,
    }),
  );

export const sendError = <T>(
  res: Response,
  status: number,
  data: T | null = null,
) => {
  return res.status(status).send(
    respondWithSchema({
      data,
      status,
    }),
  );
};
