import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TCreateProperty, TUpdateProperty } from "./landlord.interface";

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
    }
  });
};

const updatePropertiesRentReqIntoDB = async () => {};

const getRentalRequestFromDB = async () => {};

const deleteRentRequestFromDB = async () => {};

export const landlordService = {
  createPropertyIntoDB,
  getRentalRequestFromDB,
  getMyPropertyFromDB,
  updatePropertiesRentReqIntoDB,
  updatePropertiesIntoDB,
  deleteRentRequestFromDB,
};
