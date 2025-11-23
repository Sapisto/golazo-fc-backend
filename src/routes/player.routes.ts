import express from "express";
import { createPlayer } from "../controllers/admin.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createPlayerSchema } from "../utils/player.validation";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

// -------------------- Create Player (Admin only) --------------------
router.post(
    "/",
    authenticateAdmin,           // Checks JWT and sets req.adminId
    validateBody(createPlayerSchema),
    createPlayer
);

export default router;
