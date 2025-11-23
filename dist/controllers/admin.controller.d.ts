import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
export declare const createPlayer: (req: AuthRequest<{
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    teamId: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const adminLogin: (req: AuthRequest<{
    email: string;
    password: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
