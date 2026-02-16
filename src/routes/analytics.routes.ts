import { Router } from "express";
import {
  categoryWiseSalesController,
  getTotalRevenueController,
  monthlyRevenueController,
} from "../controllers/analytics.controller";

const router = Router();

router.get("/total-revenue", getTotalRevenueController);

router.get("/category-sales", categoryWiseSalesController);

router.get("/monthly-revenue", monthlyRevenueController);

export default router;
