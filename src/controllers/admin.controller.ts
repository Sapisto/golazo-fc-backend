import { Player } from "../models/player.model";
import { Admin } from "../models/admin.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendPlayerInviteEmail } from "../utils/emailService";
import { GeneralResponse } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Team } from "../models/team.model";
import { Request, Response, NextFunction, RequestHandler } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1d";

// -------------------- Create Player --------------------
export const createPlayer = async (req: AuthRequest, res: Response) => {
    try {
        // Only logged-in admin can create players
        if (!req.adminId) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 403,
                message: "Only admins can create players",
                errors: ["Unauthorized"],
            };
            return res.status(403).json(response);
        }

        const { firstName, lastName, email, position, teamId } = req.body;

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hrs

        const player = await Player.create({
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

        await sendPlayerInviteEmail(email, token);

        const response: GeneralResponse<typeof player> = {
            succeeded: true,
            code: 201,
            message: "Player created. Invitation email sent.",
            data: player,
            errors: null
        };

        return res.status(201).json(response);

    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: "Failed to create player",
            errors: [error.message],
        };

        return res.status(500).json(response);
    }
};

// -------------------- Admin Login --------------------
export const adminLogin = async (req: AuthRequest, res: Response) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["Admin not found"]
            };
            return res.status(401).json(response);
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["Wrong password"]
            };
            return res.status(401).json(response);
        }

        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const response: GeneralResponse<{ token: string }> = {
            succeeded: true,
            code: 200,
            message: "Login successful",
            data: { token },
            errors: null
        };

        return res.json(response);
    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: "Failed to login",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};
