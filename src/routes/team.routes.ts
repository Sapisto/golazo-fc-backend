import express from "express";
import { getTeams, createTeam } from "../controllers/team.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

// -------------------- Get Teams --------------------
router.get("/", getTeams);

// -------------------- Create Team (Admin only) --------------------
router.post("/", authenticateAdmin, createTeam);

export default router;
