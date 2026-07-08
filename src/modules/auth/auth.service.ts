import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TLoginUser, TRegisterUser } from "./auth.interface";

const registerUserIntoDB = async (payload: TRegisterUser) => {
  return await prisma.user.create({
    data: payload,
  });
};
const loginUserIntoDB = async (payload: TLoginUser) => {};
const getMyInfoFromDB = async () => {};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
  getMyInfoFromDB,
};
