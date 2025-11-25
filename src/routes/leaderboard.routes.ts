import express from "express";
import {
  createLeaderboardEntry,
  getLeaderboardByMonth,
  getCurrentLeaderboard,
} from "../controllers/leaderboard.controller";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createLeaderboardEntrySchema } from "../validation/validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 */

// ---------------- CREATE LEADERBOARD ENTRY ----------------
/**
 * @swagger
 * /api/leaderboard:
 *   post:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [playerId, teamId, month]
 *             properties:
 *               playerId:
 *                 type: string
 *               teamId:
 *                 type: string
 *               goals:
 *                 type: number
 *                 default: 0
 *               rcPoints:
 *                 type: number
 *                 default: 0
 *               totdPoints:
 *                 type: number
 *                 default: 0
 *               month:
 *                 type: string
 *                 example: "2025-11"
 *     responses:
 *       201:
 *         description: Leaderboard entry created successfully
 */
router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  validateBody(createLeaderboardEntrySchema),
  createLeaderboardEntry
);

// ---------------- GET CURRENT MONTH LEADERBOARD ----------------
/**
 * @swagger
 * /api/leaderboard/current:
 *   get:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current leaderboard fetched successfully
 */
router.get("/current", authenticateUser, getCurrentLeaderboard);

// ---------------- GET LEADERBOARD BY MONTH ----------------
/**
 * @swagger
 * /api/leaderboard/{month}:
 *   get:
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-11"
 *     responses:
 *       200:
 *         description: Leaderboard fetched by month
 */
router.get("/:month", authenticateUser, getLeaderboardByMonth);

export default router;
