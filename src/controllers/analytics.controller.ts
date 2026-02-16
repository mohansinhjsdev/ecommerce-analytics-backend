import { Request, Response } from "express";
import * as analyticsService from "../services/analytics.service";
import { monthlyRevenueQuerySchema } from "../validators/analytics.validator";

export const getTotalRevenueController = async (
  req: Request,
  res: Response,
) => {
  try {
    const revenue = await analyticsService.getTotalRevenue();

    res.status(200).json({
      success: true,
      totalRevenue: revenue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const categoryWiseSalesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await analyticsService.getCategoryWiseSales();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const monthlyRevenueController = async (req: Request, res: Response) => {
  try {
    const validatedQuery = monthlyRevenueQuerySchema.parse(req.query);

    const data = await analyticsService.getMonthlyRevenue(validatedQuery);

    return res.status(200).json({
      success: true,
      message: "Monthly revenue fetched succesfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
