import express from "express";
import {
  createLeaderboardEntry,
  getLeaderboardByMonth,
  getCurrentLeaderboard,
} from "../controllers/leaderboard.controller";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/leaderboard:
 *   post:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticateUser, authorizeAdmin, createLeaderboardEntry);

/**
 * @swagger
 * /api/leaderboard/{month}:
 *   get:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:month", authenticateUser, getLeaderboardByMonth);

/**
 * @swagger
 * /api/leaderboard/current:
 *   get:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 */
router.get("/current", authenticateUser, getCurrentLeaderboard);

export default router;
