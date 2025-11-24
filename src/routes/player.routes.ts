import express from "express";
import { 
  createPlayer, 
  updatePlayer, 
  deletePlayer, 
} from "../controllers/admin.controller"; 
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
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               position:
 *                 type: string
 *                 example: Forward
 *               teamName:
 *                 type: string
 *                 example: Default FC
 *     responses:
 *       201:
 *         description: Player created
 *       400:
 *         description: Validation error or team not found
 *       403:
 *         description: Unauthorized
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
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       400:
 *         description: Validation error or email conflict
 *       404:
 *         description: Player not found
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
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the player to delete
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
router.delete(
  "/:playerId",
  authenticateUser,
  authorizeAdmin,
  deletePlayer
);

export default router;
