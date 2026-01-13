import { Router } from "express";
import { healthCheck } from "../controllers/main.controller.js"

export const router = Router();

router.get("/health", healthCheck);