import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Team } from "../models/team.model";
import { Player } from "../models/player.model";
import { Match } from "../models/match.model";
import { Goal } from "../models/goal.model";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    models: [Team, Player, Match, Goal],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});

export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to Neon PostgreSQL successfully!");
    } catch (error) {
        console.error("❌ Failed to connect:", error);
    }
}
