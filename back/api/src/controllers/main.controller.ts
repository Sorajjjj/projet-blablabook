import type { Request, Response } from "express";

// Health check endpoint to verify that the API is running
export function healthCheck(req: Request, res: Response) {
    const status = true;
    const date = new Date();
    res.json({status, date})
}