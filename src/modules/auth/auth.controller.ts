import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const user = await authService.registerUserIntoDB(body);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {});
const getMyInfo = catchAsync(async (req: Request, res: Response) => {});

export const authController = {
  registerUser,
  loginUser,
  getMyInfo,
};
