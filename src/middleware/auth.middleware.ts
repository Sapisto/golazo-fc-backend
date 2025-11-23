import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GeneralResponse } from "../services/response";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthRequest extends Request {
    adminId?: string;
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 401,
            message: "Authorization header missing",
            errors: ["Unauthorized"],
        };
        return res.status(401).json(response);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 401,
            message: "Invalid or expired token",
            errors: ["Unauthorized"],
        };
        return res.status(401).json(response);
    }
};
