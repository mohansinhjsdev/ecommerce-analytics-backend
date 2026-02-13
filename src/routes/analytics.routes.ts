import { Router } from "express";
import { getTotalRevenueController } from "../controllers/analytics.controller";

const router = Router();

router.get("/total-revenue", getTotalRevenueController);

export default router;
