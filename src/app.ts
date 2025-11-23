
import type { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import adminRoutes from "./routes/admin.routes";
import playerRoutes from "./routes/player.routes";
import teamRoutes from "./routes/team.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Simple route
app.get("/", (req: Request, res: Response) => {
    res.send("Golazo FC Backend API is running...");
});

// -------------------- Routes --------------------
app.use("/api/admin", adminRoutes);     // Admin login routes
app.use("/api/players", playerRoutes);  // Player management routes
app.use("/api/teams", teamRoutes);    // Team management routes

// Error interface
interface AppError {
    statusCode?: number;
    message?: string;
    stack?: string;
}

// Error handling middleware (your format)
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    res.status(status).send(message);
});

export default app;
