import type { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import adminRoutes from "./routes/admin.routes";
import playerRoutes from "./routes/player.routes";
import teamRoutes from "./routes/team.routes";
import loginRoute from "./routes/login.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import auditRoute from "./routes/auditLogs.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";

const app = express();

// -------------------- Middlewares --------------------
app.use(cors({
    origin: "*", // or your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
    helmet({
        crossOriginResourcePolicy: false,   // allow Authorization header
        contentSecurityPolicy: false,       // disable CSP for public APIs
    })
);

app.use(express.json());
app.use(morgan("dev"));

// -------------------- Simple route --------------------
app.get("/", (req: Request, res: Response) => {
    res.send("Golazo FC Backend API is running...");
});

// -------------------- Routes --------------------
// app.use("/api/admin", adminRoutes);  
app.use("/api/leaderboard", leaderboardRoutes);  // Leaderboard management routes
app.use("/api/audit-logs", auditRoute);      // Admin management routes
app.use("/api/auth", loginRoute);    // Authentication routes
app.use("/api/players", playerRoutes);  // Player management routes
app.use("/api/teams", teamRoutes);      // Team management routes

// -------------------- Swagger Setup --------------------
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Golazo FC API",
            version: "1.0.0",
            description: "API documentation for Golazo FC backend",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Route files MUST contain JSDoc comments
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


// -------------------- Error interface --------------------
interface AppError {
    statusCode?: number;
    message?: string;
    stack?: string;
}

// -------------------- Error handling middleware --------------------
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    res.status(status).send(message);
});

export default app;
