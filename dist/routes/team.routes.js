"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const team_controller_1 = require("../controllers/team.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// -------------------- Get Teams --------------------
router.get("/", team_controller_1.getTeams);
// -------------------- Create Team (Admin only) --------------------
router.post("/", auth_middleware_1.authenticateAdmin, team_controller_1.createTeam);
exports.default = router;
//# sourceMappingURL=team.routes.js.map