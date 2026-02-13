import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
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
