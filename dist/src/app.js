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
app.get("/", (req, res) => {
    res.send("Golazo FC Backend API is running...");
});
// Error handling middleware (your format)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).send(message);
});
export default app;
//# sourceMappingURL=app.js.map