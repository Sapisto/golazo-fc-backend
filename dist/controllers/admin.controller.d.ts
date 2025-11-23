import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
export declare const createPlayer: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const adminLogin: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
