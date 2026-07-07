import { Router } from "express";
import { propertiesController } from "./properties.controller";


const router = Router();

//?public route
router.get("/", propertiesController.getAllProperties)
router.get("/", propertiesController.getSingleProperty)

export const propertiesRoute = router