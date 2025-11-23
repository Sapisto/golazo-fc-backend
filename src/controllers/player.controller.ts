import bcrypt from "bcryptjs";
import { Player } from "../models/player.model";
import { GeneralResponse } from "../services/response";

export const createPassword = async (req: any, res: any) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const player = await Player.findOne({ where: { verificationToken: token } });

        if (!player) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 400,
                message: "Invalid or expired token",
                errors: ["Token is invalid"]
            };
            return res.status(400).json(response);
        }

        if (player.tokenExpires && player.tokenExpires < new Date()) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 400,
                message: "Token expired",
                errors: ["Token no longer valid"]
            };
            return res.status(400).json(response);
        }

        const hashed = await bcrypt.hash(password, 10);

        player.password = hashed;
        player.verificationToken = null;
        player.isVerified = true;
        await player.save();

        const response: GeneralResponse<null> = {
            succeeded: true,
            code: 200,
            message: "Password created successfully",
            errors: null
        };

        return res.status(200).json(response);

    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: "Failed to set password",
            errors: [error.message]
        };
        return res.status(500).json(response);
    }
};
