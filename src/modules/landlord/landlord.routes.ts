import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import RequestValidator from "../../middleware/requestValidator";
import { propertyValidation } from "./landlord.validation";

const router = Router();
router.post(
  "/properties",
  auth(Role.LANDLORD),
  RequestValidator(propertyValidation.createProperty),
  landlordController.createProperty,
);

router.patch(
  "/properties/:id",
  auth(Role.LANDLORD),
  RequestValidator(propertyValidation.updateProperty),
  landlordController.updateProperty,
);
router.get(
  "/properties/me",
  auth(Role.LANDLORD),
  landlordController.getMyProperty,
);

router.get(
  "/requests",
  auth(Role.LANDLORD),
  landlordController.getPropertyRentReq,
);

router.patch(
  "/requests/:id",
  auth(Role.LANDLORD),
  landlordController.updateRentRequest,
);
router.delete(
  "/requests/:id",
  auth(Role.LANDLORD),
  landlordController.deleteRentRequest,
);

export const landlordRoute = router;
