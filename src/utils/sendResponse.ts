import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TResData<T> = {
  success: boolean;
  successCode: number
  message: string;
  data: T;
  meta?: TMeta;
};

export const sendResponse = <T>(res: Response, data: TResData<T>) => {
  res.status(data.successCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};
