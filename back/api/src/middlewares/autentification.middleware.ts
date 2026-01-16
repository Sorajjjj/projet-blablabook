import jwt from "jsonwebtoken";
import "express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export const requireAuth = (req:Request, res:Response, next:NextFunction) => {

     // Get the JWT secret from environment variables
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({message: "non authentifié"})
    }

    const secret = process.env.JWT_SECRET;

    try {

    if (!secret) {
        return res.status(500).json({message: "Erreur interne du serveur"})
    }

    
    // Verify and decode the token
    const validate = jwt.verify(token, secret) as {userId: string}

    req.userId = validate.userId;

    return next();

    } catch {
    return res.status(401).json({ message: "Session invalide ou expirée" });
  }

}