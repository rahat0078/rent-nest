import { categoryController } from './category.controller';
import { Router } from "express";


const router = Router();
//auth -ADMIN
router.post("/admin", categoryController.createCategory)
//public
router.get("/", categoryController.getAllCategories)



export const categoryRoute = router