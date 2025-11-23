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
 *             required: [firstName, lastName, email, position, teamId]
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
 *               teamId:
 *                 type: string
 *                 example: 1
 *     responses:
 *       201:
 *         description: Player created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Unauthorized
 */
router.post(
    "/",
    authenticateAdmin,
    validateBody(createPlayerSchema),
    createPlayer
);

export default router;
