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

const getRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user.id;
  const result = await landlordService.getRentalRequestFromDB(
    landlordId as string,
  );
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Rental Requests retrieve successfully",
    data: result,
  });
});
const getSingleRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const landlordId = req.user.id;
    const rentId = req.params.id;
    const result = await landlordService.getSingleRentalRequestFromDB(
      landlordId,
      rentId as string,
    );
    sendResponse(res, {
      success: true,
      successCode: StatusCodes.OK,
      message: "Single rental Request retrieve successfully",
      data: result,
    });
  },
);

const updateRentRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const landlordId = req.user.id;
    const rentId = req.params.id;
    const { status } = req.body;

    const result = await landlordService.updateRentRequestStatusIntoDB(
      landlordId,
      rentId as string,
      status,
    );
    sendResponse(res, {
      success: true,
      successCode: StatusCodes.OK,
      message: "Rental Requests status updated successfully",
      data: result,
    });
  },
);

export const landlordController = {
  createProperty,
  getMyProperty,
  updateProperty,
  getRentalRequest,
  updateRentRequestStatus,
  getSingleRentalRequest,
};
