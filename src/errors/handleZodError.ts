import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

const handleZodError = (error: ZodError) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    errorSources: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
};

export default handleZodError;