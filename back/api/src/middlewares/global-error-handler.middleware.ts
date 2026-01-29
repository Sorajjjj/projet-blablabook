// Import types from express
import type { Request, Response, NextFunction } from "express";
// Import zod
import z from "zod";
// Import http errors
import { HttpError } from "../lib/errors.js";

// Create function to handle error
export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  // If error from zod,
  if (error instanceof z.ZodError) {
    // Send 422 error
    res.status(422).json({ error: z.prettifyError(error) });
    // Stop function
    return;
  }

  //   If http error
  if (error instanceof HttpError) {
    // Send status code and message
    res.status(error.statusCode).json({ error: error.message });
    // Stop function
    return;
  }

  // Else, send 500 error
  res.status(500).json({ error: "Unexpected Server Error" });
}
