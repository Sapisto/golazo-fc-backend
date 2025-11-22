import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { testConnection } from "./config/index";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        // Test DB connection
        await testConnection();

        app.listen(PORT, () => {
            console.log(`\x1b[32m%s\x1b[0m`, `=================================`);
            console.log(`\x1b[32m%s\x1b[0m`, `✔ Golazo FC Backend is running on port ${PORT}`);
            console.log(`\x1b[32m%s\x1b[0m`, `=================================`);
        });
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed to start server:`, error);
        process.exit(1);
    }
}

startServer();
