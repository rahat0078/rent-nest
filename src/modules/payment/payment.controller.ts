import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createPaymentIntent = catchAsync(
  async (req: Request, res: Response) => {},
);
const createPaymentConfirm = catchAsync(
  async (req: Request, res: Response) => {},
);
const getMyAllPaymentHistory = catchAsync(
  async (req: Request, res: Response) => {},
);
const getMySinglePayment = catchAsync(
  async (req: Request, res: Response) => {},
);

export const paymentController = {
  createPaymentIntent,
  createPaymentConfirm,
  getMyAllPaymentHistory,
  getMySinglePayment,
};
