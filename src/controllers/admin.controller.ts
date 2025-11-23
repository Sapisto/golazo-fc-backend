import { User } from "../models/admin.model";
import { Player } from "../models/player.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendPlayerInviteEmail } from "../utils/emailService";
import { GeneralResponse } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { sequelize } from "../config";

export const createPlayer = async (
    req: AuthRequest<{
        firstName: string;
        lastName: string;
        email: string;
        teamId: string;
        position: string;
        username?: string;
    }>,
    res: Response
) => {
    const t = await sequelize.transaction();

    try {
        if (!req.adminId) {
            return res.status(403).json({
                succeeded: false,
                code: 403,
                message: "Only admins can create players",
                errors: ["Unauthorized"],
            });
        }

        const { firstName, lastName, email, teamId, position, username } = req.body;

        // Check email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({
                succeeded: false,
                code: 400,
                message: "Email already exists",
                errors: ["User with this email already exists"],
            });
        }

        // Check username
        if (username) {
            const existingUsername = await User.findOne({ where: { username } });
            if (existingUsername) {
                return res.status(400).json({
                    succeeded: false,
                    code: 400,
                    message: "Username already exists",
                    errors: ["Username is already taken"],
                });
            }
        }

        // Prepare values
        const rawPassword = crypto.randomBytes(6).toString("hex");
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const generatedUsername =
            username || email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

        // 1️⃣ Create user inside transaction
        const user = await User.create(
            {
                name: `${firstName} ${lastName}`,
                email,
                username: generatedUsername,
                password: hashedPassword,
                role: "player",
                isActive: true,
            },
            { transaction: t }
        );

        // 2️⃣ Create player inside transaction
        const player = await Player.create(
            {
                firstName,
                lastName,
                email,
                position,
                teamId,
                userId: user.id,
                goals: 0,
                isVerified: false,
            },
            { transaction: t }
        );

        // 3️⃣ COMMIT TRANSACTION
        await t.commit();

        // 4️⃣ Send email AFTER commit (safer)
        await sendPlayerInviteEmail(email, rawPassword, firstName);

        return res.status(201).json({
            succeeded: true,
            code: 201,
            message: "Player created successfully",
            data: {
                player,
                loginDetails: {
                    username: generatedUsername,
                    password: rawPassword,
                },
            },
        });
    } catch (error: any) {
        await t.rollback(); // rollback EVERYTHING

        return res.status(500).json({
            succeeded: false,
            code: 500,
            message: "Failed to create player",
            errors: [error.message],
        });
    }
};
