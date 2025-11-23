"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const index_1 = require("./config/index");
const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
    try {
        // Test DB connection
        await (0, index_1.testConnection)();
        app_1.default.listen(PORT, () => {
            console.log(`\x1b[32m%s\x1b[0m`, `=================================`);
            console.log(`\x1b[32m%s\x1b[0m`, `✔ Golazo FC Backend is running on port ${PORT}`);
            console.log(`\x1b[32m%s\x1b[0m`, `=================================`);
        });
    }
    catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed to start server:`, error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map