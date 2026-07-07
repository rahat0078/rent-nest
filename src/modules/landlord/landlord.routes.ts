import { Router } from "express";
import { landlordController } from "./landlord.controller";


const router = Router();
//? all are private -- auth(Landlord)
router.post("/properties", landlordController.createProperty)
router.get("/requests", landlordController.getPropertyRentReq)
router.patch("/properties/:id", landlordController.updateProperty)
router.patch("/requests/:id", landlordController.updateRentRequest)
router.delete("/requests/:id", landlordController.deleteRentRequest)






export const landlordRoute = router