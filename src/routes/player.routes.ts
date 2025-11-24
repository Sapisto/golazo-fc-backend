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
 *             required: [firstName, lastName, email, position, teamName]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               position:
 *                 type: string
 *               teamName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Player created
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
 *     responses:
 *       200:
 *         description: Player updated successfully
 */
router.put(
  "/:playerId",
  authenticateUser,
  authorizeAdmin,
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
