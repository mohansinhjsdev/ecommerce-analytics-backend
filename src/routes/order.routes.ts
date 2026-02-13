import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { validate } from "../middleware/validate.middleware";
import { createOrderSchmea } from "../validators/order.validator";

const router = Router();

router.post(
  "/create-order",
  validate(createOrderSchmea),
  createOrderController,
);

export default router;
