import express from "express";
import { userLogin } from "../controllers/login.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Pass1234
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succeeded:
 *                   type: boolean
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     role:
 *                       type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", userLogin);

export default router;
