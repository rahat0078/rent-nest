import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentRequestService } from "./rentRequest.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createRentReq = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const tenantId = req.user.id;
  const result = await rentRequestService.createRentRequestIntoDB(
    tenantId,
    payload,
  );

  sendResponse(res, {
    success: true,
    successCode: StatusCodes.CREATED,
    message: "Rent request created successfully",
    data: result,
  });
});
const getMyAllRentReq = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id;
  const result = await rentRequestService.getMyAllRentRequestFromDB(tenantId);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "My rent request fetched successfully",
    data: result,
  });
});

const getMySingleRentReq = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id;
  const {id} = req.params;
  const result = await rentRequestService.getMySingleRentRequestFrom(tenantId, id as string);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "My single rent request fetched successfully",
    data: result,
  });
});

export const rentRequestController = {
  createRentReq,
  getMyAllRentReq,
  getMySingleRentReq,
};
