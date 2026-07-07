import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createProperty = catchAsync(async (req: Request, res: Response) => {});
const getPropertyRentReq = catchAsync(
  async (req: Request, res: Response) => {},
);

const updateRentRequest = catchAsync(async (req: Request, res: Response) => {});

const updateProperty = catchAsync(async (req: Request, res: Response) => {});

const deleteRentRequest = catchAsync(async (req: Request, res: Response) => {});

export const landlordController = {
  createProperty,
  getPropertyRentReq,
  updateRentRequest,
  updateProperty,
  deleteRentRequest,
};
