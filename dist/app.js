"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const player_routes_1 = __importDefault(require("./routes/player.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Simple route
app.get("/", (req, res) => {
    res.send("Golazo FC Backend API is running...");
});
// -------------------- Routes --------------------
app.use("/api/admin", admin_routes_1.default); // Admin login routes
app.use("/api/players", player_routes_1.default); // Player management routes
app.use("/api/teams", team_routes_1.default); // Team management routes
// Error handling middleware (your format)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).send(message);
});
exports.default = app;
//# sourceMappingURL=app.js.map