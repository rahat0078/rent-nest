import { Router } from "express";
import { reviewController } from "./reviews.controller";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import { reviewValidation } from "./reviews.validation";
import RequestValidator from "../../middleware/requestValidator";

const router = Router();

// POST /api/reviews - Create review (after completed rental)
router.post(
  "/",
  auth(Role.TENANT),
  RequestValidator(reviewValidation.createReview),
  reviewController.createReview,
);

export const reviewRoute = router;
