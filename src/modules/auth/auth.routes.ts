import { Router } from "express";
import { authController } from "./auth.controller";
import RequestValidator from "../../middleware/requestValidator";
import { userValidations } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  RequestValidator(userValidations.registerUser),
  authController.registerUser,
);
router.post("/login", authController.loginUser);

//? auth()
router.get("/me", authController.getMyInfo);

export const authRoute = router;
