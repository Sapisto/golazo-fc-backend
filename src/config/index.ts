import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Team } from "../models/team.model";
import { Player } from "../models/player.model";
import { Match } from "../models/match.model";
import { Goal } from "../models/goal.model";
import { Admin } from "../models/admin.model";
import { InviteToken } from "../models/invite-token.model";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    models: [Team, Player, Match, Goal, Admin, InviteToken],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});

// Test connection, sync tables, and create initial admin
export async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to Neon PostgreSQL successfully!");

        // Sync all models
        // await sequelize.sync({ force: true });
        // console.log("✅ All tables recreated with force!");
        await sequelize.sync({ alter: true });
        console.log("✅ All tables have been created/updated!");
        const adminExists = await Admin.count();
        if (adminExists === 0) {
            const hashedPassword = await bcrypt.hash("Admin@123", 10);

            await Admin.create({
                name: "Abdulazeez Alhassan",
                username: "A_cube",
                email: "admin@golazo.com",
                password: hashedPassword,
            }); // no TS error now
            console.log("✅ Default admin created");
        } else {
            console.log("ℹ️ Admin already exists, skipping creation");
        }


    } catch (error) {
        console.error("❌ Failed to connect or sync database:", error);
    }
}

// Run sync automatically if this file is executed directly
if (require.main === module) {
    syncDatabase();
}

export async function testConnection() { try { await sequelize.authenticate(); console.log("✅ Connected to Neon PostgreSQL successfully!"); } catch (error) { console.error("❌ Failed to connect:", error); } }
