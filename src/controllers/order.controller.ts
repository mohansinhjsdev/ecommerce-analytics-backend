import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order create Successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
