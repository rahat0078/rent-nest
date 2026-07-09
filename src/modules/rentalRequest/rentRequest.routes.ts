import { Router } from "express";
import { rentRequestController } from "./rentRequest.controller";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import RequestValidator from "../../middleware/requestValidator";
import { rentRequestValidation } from "./rentRequest.validation";

const router = Router();
// role - tenant
router.post(
  "/",
  auth(Role.TENANT),
  RequestValidator(rentRequestValidation.createRentRequest),
  rentRequestController.createRentReq,
);
router.get("/", auth(Role.TENANT), rentRequestController.getMyAllRentReq);
router.get("/:id", auth(Role.TENANT), rentRequestController.getMySingleRentReq);

export const rentRequestRoute = router;