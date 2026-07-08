import RequestValidator from "../../middleware/requestValidator";
import { categoryController } from "./category.controller";
import { Router } from "express";
import { categoryValidations } from "./category.validation";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post(
  "/admin",
  auth(Role.ADMIN),
  RequestValidator(categoryValidations.createCategory),
  categoryController.createCategory,
);
//public
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategories);
export const categoryRoute = router;
