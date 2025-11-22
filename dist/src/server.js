import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import chalk from "chalk";
import { Sequelize } from "sequelize";
import { testConnection } from "./config/index.js";
const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
    try {
        // Test DB connection
        await testConnection();
        app.listen(PORT, () => {
            console.log(chalk.green.bold("✔ Golazo FC Backend is running on port ") +
                chalk.yellow.bold(PORT.toString()));
        });
    }
    catch (error) {
        console.error(chalk.red.bold("❌ Failed to start server:"), error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map