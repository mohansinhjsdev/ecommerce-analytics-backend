import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { uploadToS3 } from "../utils/s3Upload";

export const createProduct = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToS3(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
      );
    }

    const productData = {
      ...req.body,
      imageUrl: imageUrl,
    };
    const product = await productService.createProduct(productData);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await productService.getAllProducts(req.query);

    res.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//update product
export const updateProducts = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete product
export const deleteSoftProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.json({
      success: true,
      message: "Product deleted succesfully ",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
