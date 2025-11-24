import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";

export interface AuthRequest<
    BodyType = any,
    ParamsType = any,
    QueryType = any
> extends Request<ParamsType, any, BodyType, QueryType> {
    user?: { id: string; role: string }; // store decoded JWT info
    adminId?: string;                     // optional alias
}

// Generic authentication middleware — validates token
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            succeeded: false,
            code: 401,
            message: "You are not authorized",
            errors: ["Unauthorized"],
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded: any = verifyToken(token);
        req.user = decoded; // store full decoded token
        next();
    } catch (error) {
        return res.status(401).json({
            succeeded: false,
            code: 401,
            message: "Invalid or expired token",
            errors: ["Unauthorized"],
        });
    }
};

// Admin-only middleware
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            code: 403,
            message: "Only admins can perform this action",
            errors: ["Forbidden"],
        });
    }
    req.adminId = req.user.id; // set alias
    next();
};

// Super admin-only middleware
export const authorizeSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "super-admin") {
        return res.status(403).json({
            succeeded: false,
            code: 403,
            message: "Only super admins can perform this action",
            errors: ["Forbidden"],
        });
    }
    req.adminId = req.user.id; // set alias
    next();
};
