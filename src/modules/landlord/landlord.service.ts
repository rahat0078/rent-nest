import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TCreateProperty, TUpdateProperty } from "./landlord.interface";
import { RentalRequestStatus } from "../../../generated/prisma/enums";

const createPropertyIntoDB = async (
  payload: TCreateProperty,
  landlordId: string,
) => {
  return await prisma.property.create({
    data: {
      landlordId,
      ...payload,
    },
  });
};

const updatePropertiesIntoDB = async (
  payload: TUpdateProperty,
  propertyId: string,
  landlordId: string,
) => {
  const property = await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
  });
  if (property.landlordId !== landlordId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not the owner of this property",
    );
  }

  const updatedProperty = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      ...payload,
    },
  });

  return updatedProperty;
};

const getMyPropertyFromDB = async (landlordId: string) => {
  return await prisma.property.findMany({
    where: {
      landlordId,
    },
    include: {
      rentalRequest: true,
    },
  });
};

const getRentalRequestFromDB = async (landlordId: string) => {
  const rentRequest = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
    select: {
      id: true,
      status: true,
      moveInDate: true,
      message: true,
      createdAt: true,
      tenant: {
        select: {
          id: true,
          name: true,
          profilePhoto: true,
          email: true,
        },
      },
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
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return rentRequest;
};

const getSingleRentalRequestFromDB = async (
  landlordId: string,
  rentId: string,
) => {
  const rentRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentId,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profilePhoto: true,
        },
      },
      property: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!rentRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rental request not found");
  }

  if (rentRequest.property.landlordId !== landlordId) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized.");
  }

  return rentRequest;
};

const updateRentRequestStatusIntoDB = async (
  landlordId: string,
  rentId: string,
  status: RentalRequestStatus,
) => {
  const rentRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentId,
    },
    include: {
      property: {
        select: {
          id: true,
          landlordId: true,
          isAvailable: true,
        },
      },
    },
  });

  if (!rentRequest) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rental request not found");
  }

  if (rentRequest.property.landlordId !== landlordId) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
  }

  if (rentRequest.status !== RentalRequestStatus.PENDING) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This request has already been processed",
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedRequest = await tx.rentalRequest.update({
      where: {
        id: rentId,
      },
      data: {
        status,
      },
    });

    if (status === RentalRequestStatus.APPROVED) {
      await tx.property.update({
        where: {
          id: rentRequest.propertyId,
        },
        data: {
          isAvailable: false,
        },
      });
    }
    return updatedRequest;
  });

  return result;
};
export const landlordService = {
  createPropertyIntoDB,
  getRentalRequestFromDB,
  getMyPropertyFromDB,
  updateRentRequestStatusIntoDB,
  updatePropertiesIntoDB,
  getSingleRentalRequestFromDB,
};
