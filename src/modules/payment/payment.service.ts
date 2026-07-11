import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import {
  PaymentStatus,
  Provider,
  RentalRequestStatus,
} from "../../../generated/prisma/enums";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import Stripe from "stripe";

const createPaymentCheckoutIntoDB = async (
  tenantId: string,
  rentReqId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentReqId,
    },
    include: {
      property: {
        select: {
          title: true,
          rentAmount: true,
        },
      },
    },
  });
  if (!rentalRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rental request not found");
  }
  if (rentalRequest.tenantId !== tenantId) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
  }
  if (rentalRequest.status !== RentalRequestStatus.APPROVED) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Rental request is not approved",
    );
  }
  const existingPayment = await prisma.payment.findUnique({
    where: { rentalRequestId: rentReqId },
  });

  if (existingPayment) {
    if (existingPayment.status === PaymentStatus.PAID) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Payment already completed");
    }

    const isExpired =
      Date.now() - new Date(existingPayment.createdAt).getTime() >
      24 * 60 * 60 * 1000;

    if (!isExpired && existingPayment.checkoutUrl) {
      return {
        checkoutUrl: existingPayment.checkoutUrl,
        metadata: { rentalRequestId: rentReqId, tenantId },
      };
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: rentalRequest.property.title,
          },
          unit_amount: rentalRequest.property.rentAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.app_url}/payment/cancel?success=false`,
    metadata: {
      rentalRequestId: rentReqId,
      tenantId,
    },
  });

  if (existingPayment) {
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        transactionId: session.id,
        checkoutUrl: session.url,
        createdAt: new Date(),
      },
    });
  } else {
    await prisma.payment.create({
      data: {
        rentalRequestId: rentReqId,
        amount: rentalRequest.property.rentAmount,
        provider: Provider.STRIPE,
        transactionId: session.id,
        checkoutUrl: session.url,
        status: PaymentStatus.PENDING,
      },
    });
  }

  return {
    checkoutUrl: session.url,
    metadata: {
      rentalRequestId: rentReqId,
      tenantId,
    },
  };
};

const createPaymentConfirmIntoDB = async (session: Stripe.Checkout.Session) => {
  if (session.payment_status !== "paid") {
    throw new AppError(StatusCodes.BAD_REQUEST, "something went wrong payment");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: session.id,
    },
  });

  if (!payment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "payment not found. try again later",
    );
  }
  if (payment.status === PaymentStatus.PAID) {
    return payment;
  }

  const rentalRequest = await prisma.rentalRequest.findFirstOrThrow({
    where: {
      id: payment.rentalRequestId,
    },
  });

  const paymentMethod = session.payment_method_types
    ? session.payment_method_types
    : "card";

  const transactionResult = await prisma.$transaction(async (tx) => {
    (await tx.payment.update({
      where: {
        transactionId: session.id,
      },
      data: {
        paidAt: new Date(),
        status: PaymentStatus.PAID,
      },
    }),
      await tx.rentalRequest.update({
        where: {
          id: payment.rentalRequestId,
        },
        data: {
          status: RentalRequestStatus.ACTIVE,
        },
      }));
  });
};

const getMyAllPaymentHistoryFromDB = async () => {
  // Get user's payment history
};
const getMySinglePaymentFromDB = async () => {
  // Get payment details
};

export const paymentService = {
  createPaymentCheckoutIntoDB,
  createPaymentConfirmIntoDB,
  getMyAllPaymentHistoryFromDB,
  getMySinglePaymentFromDB,
};
