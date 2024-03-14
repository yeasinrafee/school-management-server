/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import express, { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = 500;
  const message = err.message || "Something went wrong!";

  return res.status(statuscode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
