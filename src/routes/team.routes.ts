import express from "express";
import { getTeams, createTeam } from "../controllers/team.controller";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management
 */

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get("/", getTeams);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team (Admin only)
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manager:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateAdmin, createTeam);

export default router;
