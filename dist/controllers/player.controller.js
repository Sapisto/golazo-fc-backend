"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const player_model_1 = require("../models/player.model");
const createPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const player = await player_model_1.Player.findOne({ where: { verificationToken: token } });
        if (!player) {
            const response = {
                succeeded: false,
                code: 400,
                message: "Invalid or expired token",
                errors: ["Token is invalid"]
            };
            return res.status(400).json(response);
        }
        if (player.tokenExpires && player.tokenExpires < new Date()) {
            const response = {
                succeeded: false,
                code: 400,
                message: "Token expired",
                errors: ["Token no longer valid"]
            };
            return res.status(400).json(response);
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        player.password = hashed;
        player.verificationToken = null;
        player.isVerified = true;
        await player.save();
        const response = {
            succeeded: true,
            code: 200,
            message: "Password created successfully",
            errors: null
        };
        return res.status(200).json(response);
    }
    catch (error) {
        const response = {
            succeeded: false,
            code: 500,
            message: "Failed to set password",
            errors: [error.message]
        };
        return res.status(500).json(response);
    }
};
exports.createPassword = createPassword;
//# sourceMappingURL=player.controller.js.map