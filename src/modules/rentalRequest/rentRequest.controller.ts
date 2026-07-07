import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createRentReq = catchAsync(async (req: Request, res: Response) => {});
const getMyAllRentReq = catchAsync(async (req: Request, res: Response) => {});

const getMySingleRentReq = catchAsync(
  async (req: Request, res: Response) => {},
);

export const rentRequestController = {
  createRentReq,
  getMyAllRentReq,
  getMySingleRentReq,
};
