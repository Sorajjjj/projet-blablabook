import { Router } from "express";
import { getSettingsPage } from "../controllers/settings.controller.js";
import { requireAuth } from "../middlewares/autentification.middleware.js";

const router = Router();

router.get("/", requireAuth, getSettingsPage);

export default router;
