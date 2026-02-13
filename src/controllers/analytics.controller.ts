import { Request, Response } from "express";
import * as analyticsService from "../services/analytics.service";

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
