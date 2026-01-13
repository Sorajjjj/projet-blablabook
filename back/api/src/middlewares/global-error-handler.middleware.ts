// Import types from express
import type { NextFunction, Request, Response } from "express";
// Import zod
import z from "zod";

// Create function to handle error
export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If error from zod,
  if (error instanceof z.ZodError) {
    // Send 422 error
    res.status(422).json({ error: z.prettifyError(error) });
    // Stop the function
    return;
  }
  // Else, send 500 error
  res.status(500).json({ error: "Unexpected Server Error" });
}
