import { Response, Request } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllProperties = catchAsync(async (req: Request, res: Response) => {});
const getSingleProperty = catchAsync(async (req: Request, res: Response) => {});

export const propertiesController = {
  getAllProperties,
  getSingleProperty,
};
