import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { landlordService } from "./landlord.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const landlordId = req.user?.id;
  const result = await landlordService.createPropertyIntoDB(
    payload,
    landlordId,
  );

  sendResponse(res, {
    success: true,
    successCode: StatusCodes.CREATED,
    message: "Property created successfully",
    data: result,
  });
});
const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const landlordId = req.user?.id;
  const propertyId = req.params.id;
  const result = await landlordService.updatePropertiesIntoDB(
    payload,
    propertyId as string,
    landlordId,
  );
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Property updated successfully",
    data: result,
  });
});

const getMyProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user.id;
  const result = await landlordService.getMyPropertyFromDB(landlordId);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Property retrieve successfully",
    data: result,
  });
});

const getPropertyRentReq = catchAsync(
  async (req: Request, res: Response) => {},
);

const updateRentRequest = catchAsync(async (req: Request, res: Response) => {});

const deleteRentRequest = catchAsync(async (req: Request, res: Response) => {});

export const landlordController = {
  createProperty,
  getMyProperty,
  updateProperty,
  getPropertyRentReq,
  updateRentRequest,
  deleteRentRequest,
};
