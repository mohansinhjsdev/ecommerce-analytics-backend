import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";

export const validate =
  (schema: ZodType<any>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
  };
