"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
// -------------------- Admin Login --------------------
router.post("/login", admin_controller_1.adminLogin);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map