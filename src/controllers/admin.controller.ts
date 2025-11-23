import { User } from "../models/admin.model";
import { Player } from "../models/player.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendPlayerInviteEmail } from "../utils/emailService";
import { GeneralResponse } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";

// -------------------- Create Player --------------------
export const createPlayer = async (
    req: AuthRequest<{ firstName: string; lastName: string; email: string; teamId: string; position: string }>,
    res: Response
) => {
    try {
        if (!req.adminId) {
            return res.status(403).json({
                succeeded: false,
                code: 403,
                message: "Only admins can create players",
                errors: ["Unauthorized"],
            } as GeneralResponse<null>);
        }

        const { firstName, lastName, email, teamId, position } = req.body;

        // Generate random password
        const rawPassword = crypto.randomBytes(6).toString("hex"); // 12 chars
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        // 1️⃣ Create User login
        const user = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            role: "player",
            isActive: true,
            username: email.split("@")[0],
        });

        // 2️⃣ Create Player profile
        const player = await Player.create({
            firstName,
            lastName,
            email,
            position,
            teamId,
            userId: user.id,
            goals: 0,
            isVerified: false,
        });

        // 3️⃣ Send login credentials via email
        await sendPlayerInviteEmail(email, rawPassword, firstName);

        return res.status(201).json({
            succeeded: true,
            code: 201,
            message: "Player created. Credentials sent via email.",
            data: player, // Player instance
            errors: null,
        } as GeneralResponse<Player>);

    } catch (error: any) {
        return res.status(500).json({
            succeeded: false,
            code: 500,
            message: "Failed to create player",
            errors: [error.message],
        } as GeneralResponse<null>);
    }
};
