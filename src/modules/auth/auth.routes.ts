import { Router } from "express";
import { authController } from "./auth.controller";
import RequestValidator from "../../middleware/requestValidator";
import { userValidations } from "./auth.validation";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  RequestValidator(userValidations.registerUser),
  authController.registerUser,
);
router.post("/login", authController.loginUser);

router.get("/me", auth(), authController.getMyInfo);

export const authRoute = router;
