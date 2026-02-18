import { Router } from "express";
import {
  createProduct,
  deleteSoftProduct,
  getAllProducts,
  getProduct,
  updateProducts,
} from "../controllers/product.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { validateObjectId } from "../middleware/validateObjectId";
import { upload } from "../middleware/upload.middleware";

const router = Router();
console.log("Product route loaded");

router.post(
  "/",
  upload.single("image"),
  validate(createProductSchema),
  createProduct,
);
router.get("/get-product", getAllProducts);

router.get("/get-product/:id", validateObjectId, getProduct);
router.put(
  "/update-product/:id",
  validateObjectId,
  validate(updateProductSchema),
  updateProducts,
);

router.delete("/delete-product/:id", validateObjectId, deleteSoftProduct);
export default router;
