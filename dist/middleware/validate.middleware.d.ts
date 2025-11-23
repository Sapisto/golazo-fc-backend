import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
export declare const validateBody: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
