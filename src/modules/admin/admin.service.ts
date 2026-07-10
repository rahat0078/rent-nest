import { StatusCodes } from "http-status-codes";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";


const getAllUsersFromDB = async () => {
  const [users, totalUsers] = await Promise.all([
    await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profilePhoto: true,
        status: true,
        phone: true,
      },
    }),
    await prisma.user.count(),
  ]);

  return {
    users,
    totalUsers,
  };
};

const updateUserStatusIntoDB = async (userId: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (user.status === status) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User status are same");
  }
  const updateStatus = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: status,
    },
  });
};

const getAllPropertiesFromDB = async () => {
  const property = await prisma.property.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      rentAmount: true,
      sizeSqFt: true,
      bedrooms: true,
      bathrooms: true,
      isAvailable: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
        },
      },
    },
  });

  return property;
};

const getAllRentalRequestFromDB = async () => {
  const rentRequest = await prisma.rentalRequest.findMany({
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
          email: true,
          phone: true,
          profilePhoto: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          location: true,
          rentAmount: true,
          isAvailable: true,
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      payment: {
        select: {
          id: true,
          amount: true,
          status: true,
          transactionId: true,
          paymentMethod: true,
          paidAt: true,
        },
      },
    },
  });
  return rentRequest;
};

//TODO: add admin statistics

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestFromDB,
};
