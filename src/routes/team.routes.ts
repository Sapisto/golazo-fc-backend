import express from "express";
import { getTeams, createTeam } from "../controllers/team.controller";
import { authenticateUser, authorizeSuperAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 */

/**
 * @swagger
 * /api/teams:
 *   get:
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of teams
 */
router.get("/", getTeams);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Golazo FC
 *     responses:
 *       201:
 *         description: Team created
 *       400:
 *         description: Team name exists
 *       403:
 *         description: Unauthorized
 */
router.post("/", authenticateUser, authorizeSuperAdmin, createTeam);


export default router;
