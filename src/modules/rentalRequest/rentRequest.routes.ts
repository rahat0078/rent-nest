import { Router } from "express";
import { rentRequestController } from "./rentRequest.controller";


const router = Router();
// role - tenant
router.post("/", rentRequestController.createRentReq)
router.get("/", rentRequestController.getMyAllRentReq)
router.get("/:id", rentRequestController.getMySingleRentReq)





export const rentRequestRoute = router