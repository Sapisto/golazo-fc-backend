import express from "express";
import { getTeams, createTeam } from "../controllers/team.controller";
import { getTeamByIdOrName } from "../controllers/team.controller"; // import new controller
import {
  authenticateUser,
  authorizeAdmin,
  authorizeSuperAdmin,
} from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createTeamSchema } from "../validation/validation";
import { getPlayersByTeam } from "../controllers/admin.controller";

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
router.get("/", authenticateUser, getTeams);

/**
 * @swagger
 * /api/teams/single:
 *   get:
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Team ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Team name
 *     responses:
 *       200:
 *         description: Team details
 *       404:
 *         description: Team not found
 */
router.get("/teamById", authenticateUser, getTeamByIdOrName);

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
router.post(
  "/",
  authenticateUser,
  validateBody(createTeamSchema),
  authorizeSuperAdmin,
  createTeam
);


/**
 * @swagger
 * /api/teams/{teamId}/players:
 *   get:
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team
 *     responses:
 *       200:
 *         description: List of players in the team
 *       404:
 *         description: Team not found
 */
router.get(
  "/players/:teamId",
  authenticateUser,
  authorizeAdmin,
  getPlayersByTeam
);

export default router;
