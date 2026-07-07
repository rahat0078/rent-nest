import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllCategories = catchAsync(async (req: Request, res: Response) => {});
const createCategory = catchAsync(async (req: Request, res: Response) => {});
export const categoryController = {
  getAllCategories,
  createCategory
};
