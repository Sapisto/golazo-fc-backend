import express from "express";
import { 
  getTeams, 
  createTeam, 
  getTeamByIdOrName,
  deleteTeam
} from "../controllers/team.controller";

import { getPlayersByTeam } from "../controllers/player.controller";

import {
  authenticateUser,
  authorizeAdmin,
  authorizeSuperAdmin,
} from "../middleware/auth.middleware";

import { validateBody } from "../middleware/validate.middleware";
import { createTeamSchema } from "../validation/validation";

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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
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
 *     security:
 *       - bearerAuth: []
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
router.get("/getSingleTeam", authenticateUser, getTeamByIdOrName);

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
 *     responses:
 *       201:
 *         description: Team created
 *       400:
 *         description: Duplicate name
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authenticateUser,
  authorizeSuperAdmin,
  validateBody(createTeamSchema),
  createTeam
);

/**
 * @swagger
 * /api/teams/{teamId}:
 *   delete:
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to delete
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       403:
 *         description: Forbidden
 */
router.delete("/:teamId", authenticateUser, authorizeSuperAdmin, deleteTeam);

/**
 * @swagger
 * /api/teams/{teamId}/players:
 *   get:
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Players belonging to the team
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
