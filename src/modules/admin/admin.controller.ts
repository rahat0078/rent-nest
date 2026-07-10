import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "All users fetched successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { status } = req.body;
  const result = await adminService.updateUserStatusIntoDB(
    userId as string,
    status,
  );
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "update user status successfully",
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllPropertiesFromDB();
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "All property fetched successfully",
    data: result,
  });
});

const getAllRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllRentalRequestFromDB();
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "All rent request fetched successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequest,
};
