import express from "express";
import { createPlayer } from "../controllers/admin.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createPlayerSchema } from "../utils/player.validation";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management
 */

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new player (Admin only)
 *     tags: [Players]
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
 *               position:
 *                 type: string
 *               teamId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 */
router.post(
    "/",
    authenticateAdmin,
    validateBody(createPlayerSchema),
    createPlayer
);

export default router;
