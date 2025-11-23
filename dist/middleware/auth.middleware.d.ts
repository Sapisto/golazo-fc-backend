import { Request, Response, NextFunction } from "express";
export interface AuthRequest<BodyType = any, // the type for req.body
ParamsType = any, // the type for req.params
QueryType = any> extends Request<ParamsType, any, BodyType, QueryType> {
    adminId?: string;
}
export declare const authenticateAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
