import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  auth(Role.TENANT),
  paymentController.createPaymentCheckout,
);
router.get("/me", auth(Role.TENANT), paymentController.getMyAllPaymentHistory);
router.get("/me/:id", auth(Role.TENANT), paymentController.getMySinglePayment);

export const paymentRoute = router;
