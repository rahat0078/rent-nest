import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "User already exists with this email",
    );
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round),
  );
  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const loginUserIntoDB = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const { password: userPass, ...userData } = user;

  return {
    accessToken,
    userData,
  };
};

const getMyInfoFromDB = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
  getMyInfoFromDB,
};
