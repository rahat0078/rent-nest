import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response) => {});
const loginUser = catchAsync(async (req: Request, res: Response) => {});
const getMyInfo = catchAsync(async (req: Request, res: Response) => {});

export const authController = {
  registerUser,
  loginUser,
  getMyInfo,
};
