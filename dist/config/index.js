"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.syncDatabase = syncDatabase;
exports.testConnection = testConnection;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const team_model_1 = require("../models/team.model");
const player_model_1 = require("../models/player.model");
const match_model_1 = require("../models/match.model");
const goal_model_1 = require("../models/goal.model");
const admin_model_1 = require("../models/admin.model");
const invite_token_model_1 = require("../models/invite-token.model");
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    models: [team_model_1.Team, player_model_1.Player, match_model_1.Match, goal_model_1.Goal, admin_model_1.Admin, invite_token_model_1.InviteToken],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});
// Test connection, sync tables, and create initial admin
async function syncDatabase() {
    try {
        await exports.sequelize.authenticate();
        console.log("✅ Connected to Neon PostgreSQL successfully!");
        // Sync all models
        // await sequelize.sync({ force: true });
        // console.log("✅ All tables recreated with force!");
        await exports.sequelize.sync({ alter: true });
        console.log("✅ All tables have been created/updated!");
        const adminExists = await admin_model_1.Admin.count();
        if (adminExists === 0) {
            const hashedPassword = await bcryptjs_1.default.hash("Admin@123", 10);
            await admin_model_1.Admin.create({
                name: "Abdulazeez Alhassan",
                username: "A_cube",
                email: "admin@golazo.com",
                password: hashedPassword,
            }); // no TS error now
            console.log("✅ Default admin created");
        }
        else {
            console.log("ℹ️ Admin already exists, skipping creation");
        }
    }
    catch (error) {
        console.error("❌ Failed to connect or sync database:", error);
    }
}
// Run sync automatically if this file is executed directly
if (require.main === module) {
    syncDatabase();
}
async function testConnection() { try {
    await exports.sequelize.authenticate();
    console.log("✅ Connected to Neon PostgreSQL successfully!");
}
catch (error) {
    console.error("❌ Failed to connect:", error);
} }
//# sourceMappingURL=index.js.map