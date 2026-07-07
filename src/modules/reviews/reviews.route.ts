import { Router } from "express";
import { reviewController } from "./reviews.controller";

const router = Router();

// POST /api/reviews - Create review (after completed rental)
router.post("/", reviewController.createReview);

export const reviewRoute = router;
