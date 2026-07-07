import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    path: req.originalUrl,
    message: "Route not found",
    date: Date()
  });
}