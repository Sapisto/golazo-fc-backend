import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Team } from "../models/team.model";
import { Player } from "../models/player.model";
import { Match } from "../models/match.model";
import { Goal } from "../models/goal.model";
import { User } from "../models/admin.model";
import { InviteToken } from "../models/invite-token.model";
import { AuditLog } from "../models/audit-log.model";
import { Leaderboard } from "../models/leaderboard.model";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    models: [Team, Player, Match, Goal, User, AuditLog, Leaderboard],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});

export async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to PostgreSQL successfully!");

        // Drop all tables and recreate (use force: true)
        await sequelize.sync({ alter: true });

        // Create default team first
        const defaultTeam = await Team.create({ name: "Default FC" });

        // Default super-admin
        const superAdminPassword = await bcrypt.hash("Password@123", 10);
        await User.create({
            name: "Super Admin",
            username: "superadmin",
            email: "superadmin@golazo.com",
            password: superAdminPassword,
            role: "super-admin",
            isActive: true,
        });

        // Default admin
        const adminPassword = await bcrypt.hash("Password@123", 10);
        await User.create({
            name: "Seper Admin",
            username: "admin",
            email: "admin@golazo.com",
            password: adminPassword,
            role: "admin",
            isActive: true,
        });

        // Default player
        const playerPassword = await bcrypt.hash("Password@123", 10);
        const playerUser = await User.create({
            name: "Default Player",
            username: "player1",
            email: "player1@golazo.com",
            password: playerPassword,
            role: "player",
            isActive: true,
        });

        await Player.create({
            firstName: "Default",
            lastName: "Player",
            email: "player1@golazo.com",
            position: "Forward",
            teamId: defaultTeam.id,
            userId: playerUser.id,
            goals: 0,
            isVerified: false,
        });


        console.log("✅ Default player created");

    } catch (error) {
        console.error("❌ Failed to sync database:", error);
    }
}

// Run sync automatically if executed directly
if (require.main === module) {
    syncDatabase();
}

export async function testConnection() { try { await sequelize.authenticate(); console.log("✅ Connected to Neon PostgreSQL successfully!"); } catch (error) { console.error("❌ Failed to connect:", error); } }