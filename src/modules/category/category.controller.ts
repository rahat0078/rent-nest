import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoriesFromDB();
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Category retrieve successfully",
    data: result,
  });
});
const getSingleCategories = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.getSingleCategoriesFromDB(id as string);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Category data retrieve successfully",
    data: result,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategoryIntoDB(req.body);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.CREATED,
    message: "category created successfully",
    data: result,
  });
});
export const categoryController = {
  getAllCategories,
  createCategory,
  getSingleCategories,
};
