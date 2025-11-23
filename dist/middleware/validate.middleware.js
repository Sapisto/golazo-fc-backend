"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const response = {
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
exports.validateBody = validateBody;
//# sourceMappingURL=validate.middleware.js.map