import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TCreateRentReq } from "./rentRequest.interface";
import { RentalRequestStatus } from "../../../generated/prisma/enums";

const createRentRequestIntoDB = async (
  tenantId: string,
  payload: TCreateRentReq,
) => {
  const { propertyId } = payload;
  const property = await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
    select: {
      isAvailable: true,
    },
  });
  if (!property.isAvailable) {
    throw new AppError(403, "your property is currently unavailable");
  }

  const existRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: {
        in: [
          RentalRequestStatus.ACTIVE,
          RentalRequestStatus.APPROVED,
          RentalRequestStatus.PENDING,
        ],
      },
    },
    select: {
      status: true
    }
  });

  if (existRequest) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `You already have a ${existRequest.status} request for this property`,
    );
  }

  const result = await prisma.rentalRequest.create({
    data: {
      tenantId,
      ...payload,
    },
  });

  return result;
};
const getMyAllRentRequestFromDB = async (tenantId: string) => {
  return await prisma.rentalRequest.findMany({
    where: { tenantId },
    include: {
      property: {
        select: {
          id: true,
          title: true,
          location: true,
          rentAmount: true,
          images: true,
          isAvailable: true,
          category: {
            select: {
              name: true,
            },
          },
          landlord: {
            select: {
              name: true,
              profilePhoto: true,
            },
          },
        },
      },
    },
  });
};
const getMySingleRentRequestFrom = async (tenantId: string, id: string) => {
  const rentRequest = await prisma.rentalRequest.findUnique({
    where: {
      id,
    },
    include: {
      property: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          rentAmount: true,
          bedrooms: true,
          bathrooms: true,
          sizeSqFt: true,
          facilities: true,
          images: true,
          isAvailable: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
          landlord: {
            select: {
              name: true,
              id: true,
              profilePhoto: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!rentRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rent request not found");
  }
  if (rentRequest.tenantId !== tenantId) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
  }

  return rentRequest;
};

export const rentRequestService = {
  createRentRequestIntoDB,
  getMyAllRentRequestFromDB,
  getMySingleRentRequestFrom,
};
