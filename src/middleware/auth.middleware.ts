import { Request, Response, NextFunction } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const auth = (...roles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Authentication token is required.",
      );
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new AppError(StatusCodes.UNAUTHORIZED, verifiedToken.error);
    }

    const decoded = verifiedToken.data as JwtPayload;

    if (!decoded?.id) {
      throw new Error("Invalid authentication token.");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found.");
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError(StatusCodes.FORBIDDEN, "Your account is inactive.");
    }

    if (roles.length && !roles.includes(user.role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized to access this resource.",
      );
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  });
};
