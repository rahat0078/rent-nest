import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../generated/prisma/client";

const handlePrismaError = (error: any) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Database Error";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        statusCode = StatusCodes.CONFLICT;
        message = "Duplicate value. Record already exists.";
        break;

      case "P2003":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid reference.";
        break;

      case "P2025":
        statusCode = StatusCodes.NOT_FOUND;
        message = "Record not found.";
        break;
      default:
        message = "Database request failed.";
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Invalid database query.";
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = "Database connection failed.";
  }

  return {
    statusCode,
    message,
    errorSources: [],
  };
};

export default handlePrismaError;
