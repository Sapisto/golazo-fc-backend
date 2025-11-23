"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const player_validation_1 = require("../utils/player.validation");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// -------------------- Create Player (Admin only) --------------------
router.post("/", auth_middleware_1.authenticateAdmin, // Checks JWT and sets req.adminId
(0, validate_middleware_1.validateBody)(player_validation_1.createPlayerSchema), admin_controller_1.createPlayer);
exports.default = router;
//# sourceMappingURL=player.routes.js.map