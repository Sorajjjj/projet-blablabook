import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { NotFoundError, UnauthorizedError } from "../lib/errors.js";
import {
  updateEmailSchema,
  updatePasswordSchema,
  updateUsernameSchema,
} from "../schemas/settingsSchema.js";
import argon2 from "argon2";

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

export async function updateUsername(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;

    const { username } = updateUsernameSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { userId },
      data: { username },
      select: {
        username: true,
      },
    });

    return res.status(200).json({
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEmailAddress(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;

    const { email } = updateEmailSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { userId },
      data: { email },
      select: {
        email: true,
      },
    });

    return res.status(200).json({
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;

    const { currentPassword, newPassword } = updatePasswordSchema.parse(
      req.body,
    );

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundError("Utilisateur introuvable");
    }

    // argon2 hashes current password and compares it to the stored hashed password
    const isValid = await argon2.verify(user.passwordHash, currentPassword);

    if (!isValid) {
      throw new UnauthorizedError("Mot de passe actuel incorrect");
    }

    // argon2 hashes new password
    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { userId },
      data: { passwordHash: hashedPassword },
    });

    return res
      .status(200)
      .json({ message: "Nouveau mot de passe enregistré avec succès !" });
  } catch (error) {
    next(error);
  }
}
