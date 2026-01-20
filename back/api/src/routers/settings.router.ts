import { Router } from "express";
import { requireAuth } from "../middlewares/autentification.middleware.js";
import {
  getSettingsPage,
  updateUsername,
} from "../controllers/settings.controller.js";

const router = Router();

// Router to get settings page
router.get("/", requireAuth, getSettingsPage);
// Router to put new username
router.put("/username", requireAuth, updateUsername);

export default router;
