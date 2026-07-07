import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createCategories = catchAsync(async (req: Request, res: Response) => {});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {});

const getAllRentalRequest = catchAsync(
  async (req: Request, res: Response) => {}
);

export const adminController = {
  createCategories,
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequest,
};