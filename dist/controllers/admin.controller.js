"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.createPlayer = void 0;
const player_model_1 = require("../models/player.model");
const admin_model_1 = require("../models/admin.model");
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("../utils/emailService");
const auth_service_1 = require("../services/auth.service");
// -------------------- Create Player --------------------
const createPlayer = async (req, res) => {
    try {
        if (!req.adminId) {
            const response = {
                succeeded: false,
                code: 403,
                message: "Only admins can create players",
                errors: ["Unauthorized"],
            };
            return res.status(403).json(response);
        }
        const { firstName, lastName, email, position, teamId } = req.body;
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hrs
        const player = await player_model_1.Player.create({
            firstName,
            lastName,
            email,
            position,
            teamId,
            verificationToken: token,
            tokenExpires,
            isVerified: false,
            password: null,
            goals: 0,
        });
        await (0, emailService_1.sendPlayerInviteEmail)(email, token);
        const response = {
            succeeded: true,
            code: 201,
            message: "Player created. Invitation email sent.",
            data: player,
            errors: null,
        };
        return res.status(201).json(response);
    }
    catch (error) {
        const response = {
            succeeded: false,
            code: 500,
            message: "Failed to create player",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};
exports.createPlayer = createPlayer;
// -------------------- Admin Login --------------------
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_model_1.Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).json({
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["Admin not found"],
            });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["Wrong password"],
            });
        }
        // ✅ Use generateToken
        const token = (0, auth_service_1.generateToken)({ id: admin.id, email: admin.email });
        return res.json({
            succeeded: true,
            code: 200,
            message: "Login successful",
            data: { token },
            errors: null,
        });
    }
    catch (error) {
        return res.status(500).json({
            succeeded: false,
            code: 500,
            message: "Failed to login",
            errors: [error.message],
        });
    }
};
exports.adminLogin = adminLogin;
//# sourceMappingURL=admin.controller.js.map