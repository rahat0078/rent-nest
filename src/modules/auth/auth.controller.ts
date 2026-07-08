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

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const {accessToken, userData} = await authService.loginUserIntoDB(payload);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  })
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "User login successfully",
    data: {accessToken, userData},
  });
});
const getMyInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await authService.getMyInfoFromDB(id);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Profile retrieve successfully",
    data: user,
  });
});

export const authController = {
  registerUser,
  loginUser,
  getMyInfo,
};
