"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticateAdmin = (req, res, next) => {
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
        const decoded = (0, auth_service_1.verifyToken)(token);
        req.adminId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            succeeded: false,
            code: 401,
            message: "Invalid or expired token",
            errors: ["Unauthorized"]
        });
    }
};
exports.authenticateAdmin = authenticateAdmin;
//# sourceMappingURL=auth.middleware.js.map