// src/routes/audit-log.routes.ts
import express from "express";
import { getAuditLogs } from "../controllers/audit-log.controller";
import { authenticateUser, authorizeSuperAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AuditLogs
 *   description: Operations related to audit logs
 */

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     tags: [AuditLogs]
 *     security:
 *       - bearerAuth: []
 *     summary: Get paginated audit logs
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
 *         description: Number of logs per page
 *       - in: query
 *         name: actorId
 *         schema:
 *           type: string
 *         description: Filter by actor/user ID
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter by action type (create, update, delete, login, etc.)
 *       - in: query
 *         name: targetType
 *         schema:
 *           type: string
 *         description: Filter by target type (User, Player, Team, etc.)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter logs from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter logs until this date
 *     responses:
 *       200:
 *         description: Paginated audit logs fetched successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authenticateUser, authorizeSuperAdmin, getAuditLogs);

export default router;
