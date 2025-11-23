import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";


export interface AuthRequest extends Request {
    adminId?: string;
}


export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            succeeded: false,
            code: 401,
            message: "Authorization header missing",
            errors: ["Unauthorized"]
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // ✅ Use verifyToken instead of inline jwt.verify
        const decoded: any = verifyToken(token);
        req.adminId = decoded.id;
        next();
    } catch (error: any) {
        return res.status(401).json({
            succeeded: false,
            code: 401,
            message: "Invalid or expired token",
            errors: ["Unauthorized"]
        });
    }
};
