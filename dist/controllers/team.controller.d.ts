import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
export declare const createTeam: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const getTeams: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
