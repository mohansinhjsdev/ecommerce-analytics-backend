import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";

export const validateObjectId: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  next();
};
