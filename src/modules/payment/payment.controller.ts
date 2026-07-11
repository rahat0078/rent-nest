import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { stripe } from "../../lib/stripe";

const createPaymentCheckout = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user.id;
  const { rentRequestId } = req.body;
  const result = await paymentService.createPaymentCheckoutIntoDB(
    tenantId,
    rentRequestId,
  );
  sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Payment session created successfully",
    data: result,
  });
});

const createPaymentConfirm = async (request: Request, response: Response) => {

  let event = request.body;

  if (config.endpointSecret) {
    
    const signature = request.headers["stripe-signature"]!;

    try {

      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        config.endpointSecret,
      );
    } catch (err: any) {
      console.log("⚠️ Webhook signature verification failed.", err.message);

      return response.status(400).json({
        message: err.message
      });
    }
  }


  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await paymentService.createPaymentConfirmIntoDB(session);

      break;
    }
  
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  return response.sendStatus(200);
};

const getMyAllPaymentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const tenantId = req.user.id;
    const payment = await paymentService.getMyAllPaymentHistoryFromDB(tenantId);
     sendResponse(res, {
    success: true,
    successCode: StatusCodes.OK,
    message: "Payment history fetched successfully",
    data: payment,
  });
  },
);
const getMySinglePayment = catchAsync(
  async (req: Request, res: Response) => {},
);

export const paymentController = {
  createPaymentCheckout,
  createPaymentConfirm,
  getMyAllPaymentHistory,
  getMySinglePayment,
};
