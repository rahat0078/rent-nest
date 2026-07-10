import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./reviews.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user.id;
  const payload = req.body;
  const result = await reviewService.createReviewIntoDB(tenantId, payload);
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
