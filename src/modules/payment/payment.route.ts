import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", paymentController.createPaymentIntent);
router.post("/confirm", paymentController.createPaymentConfirm);
router.get("/me", paymentController.getMyAllPaymentHistory);
router.get("/me/:id", paymentController.getMySinglePayment);

export const paymentRoute = router;
