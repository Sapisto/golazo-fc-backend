
import type { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

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
