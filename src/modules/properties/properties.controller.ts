import { Response, Request } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./properties.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllProperties = catchAsync(async (req: Request, res: Response) => {

  const result = await propertyService.getAllPropertiesFromDB(req.query);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Properties retrieve successfully",
    data: result,
  });
});
const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await propertyService.getSinglePropertyFromDB(id as string);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Single property retrieve successfully",
    data: result,
  });
});

export const propertiesController = {
  getAllProperties,
  getSingleProperty,
};
