import express from "express";
import {
    createPlayer,
    updatePlayer,
    deletePlayer,
} from "../controllers/admin.controller";
import { getPlayersByTeam } from "../controllers/player.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createPlayerSchema, updatePlayerSchema } from "../validation/validation";
import { authorizeAdmin, authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 */

/**
 * @swagger
 * /api/players:
 *   post:
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, username, position, teamName]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *                 description: Username must be provided and unique
 *               position:
 *                 type: string
 *               teamName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succeeded:
 *                   type: boolean
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     player:
 *                       type: object
 *                     loginDetails:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *       400:
 *         description: Validation error or duplicate email/username
 *       500:
 *         description: Server error
 */

router.post(
    "/",
    authenticateUser,
    authorizeAdmin,
    validateBody(createPlayerSchema),
    createPlayer
);

/**
 * @swagger
 * /api/players/{playerId}:
 *   put:
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the player to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Updated first name of the player
 *               lastName:
 *                 type: string
 *                 description: Updated last name of the player
 *               email:
 *                 type: string
 *                 description: Updated email (must be unique)
 *               position:
 *                 type: string
 *                 description: Updated position (e.g., Forward, Midfielder)
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       400:
 *         description: Validation error or email already exists
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */

router.put(
    "/:playerId",
    authenticateUser,
    // authorizeAdmin,
    validateBody(updatePlayerSchema),
    updatePlayer
);

/**
 * @swagger
 * /api/players/{playerId}:
 *   delete:
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/:playerId",
    authenticateUser,
    authorizeAdmin,
    deletePlayer
);

/**
 * @swagger
 * /api/players/team/{teamId}:
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
 *     responses:
 *       200:
 *         description: Players fetched successfully
 */
router.get(
    "/team/:teamId",
    authenticateUser,
    authorizeAdmin,
    getPlayersByTeam
);

export default router;
