import { User } from "../models/admin.model";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { generateToken } from "../services/auth.service";
import { GeneralResponse } from "../services/response";


export const userLogin = async (
    req: AuthRequest<{ email: string; password: string }>,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["User not found"],
            } as GeneralResponse<null>);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                succeeded: false,
                code: 401,
                message: "Invalid email or password",
                errors: ["Wrong password"],
            } as GeneralResponse<null>);
        }

        // Generate JWT token with user role
        const token = generateToken({ id: user.id, role: user.role });


        return res.json({
            succeeded: true,
            code: 200,
            message: "Login successful",
            data: { token, role: user.role },
            errors: null,
        } as GeneralResponse<{ token: string; role: string }>);
    } catch (error: any) {
        return res.status(500).json({
            succeeded: false,
            code: 500,
            message: "Failed to login",
            errors: [error.message],
        } as GeneralResponse<null>);
    }
};
