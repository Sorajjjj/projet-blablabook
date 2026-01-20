import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { NotFoundError } from "../lib/errors.js";

export async function getSettingsPage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // No UUID validation needed because no route params
    // Get the user id from the auth middleware
    // To make the guarantee that userId exists (because of the middleware), use "!"
    // To avoid "undefined"
    const userId = req.userId!;

    // Get the user with matching id
    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        username: true,
        email: true,
        isActive: true,
        settings: {
          select: {
            theme: true,
          },
        },
      },
    });

    // If user does not exists, send 404 error
    if (!user) {
      throw new NotFoundError("Utilisateur inexistant");
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      // If the user has settings and a theme, use it;
      // Otherwise, use "light" as the default theme
      theme: user.settings?.theme ?? "light",
    });
  } catch (error) {
    next(error);
  }
}
