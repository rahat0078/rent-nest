import { StatusCodes } from "http-status-codes";
import { RentalRequestStatus } from "../../../generated/prisma/enums";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TCreateReview } from "./reviews.interface";

const createReviewIntoDB = async (tenantId: string, payload: TCreateReview) => {
  const { propertyId } = payload;

  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: RentalRequestStatus.COMPLETED,
    },
  });

  if (!rentalRequest) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You can't review this property. Your rental is not complete",
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (existingReview) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You have already review this property",
    );
  }

  const review = await prisma.review.create({
    data: {
      tenantId,
      ...payload,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          profilePhoto: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return review;
};
export const reviewService = {
  createReviewIntoDB,
};
