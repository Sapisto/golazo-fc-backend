import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { GeneralResponse } from "../services/response";

export const validateBody = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 400,
                message: "Validation error",
                errors: error.details.map(d => d.message),
            };
            return res.status(400).json(response);
        }
        next();
    };
};
