import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();
router.post("/categories", adminController.createCategories);
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.updateUserStatus);
router.get("/properties", adminController.getAllProperties);
router.get("/rentals", adminController.getAllRentalRequest);

export const adminRoute = router;