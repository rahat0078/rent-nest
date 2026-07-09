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
  "/rentals/requests",
  auth(Role.LANDLORD),
  landlordController.getRentalRequest,
);

router.get(
  "/rentals/requests/:id",
  auth(Role.LANDLORD),
  landlordController.getSingleRentalRequest,
);

router.patch(
  "/rentals/requests/:id",
  auth(Role.LANDLORD),
  landlordController.updateRentRequestStatus,
);

export const landlordRoute = router;
