"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.testConnection = testConnection;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const team_model_js_1 = require("../models/team.model.js");
const player_model_js_1 = require("../models/player.model.js");
const match_model_js_1 = require("../models/match.model.js");
const goal_model_js_1 = require("../models/goal.model.js");
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    models: [team_model_js_1.Team, player_model_js_1.Player, match_model_js_1.Match, goal_model_js_1.Goal],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            console.log("✅ Connected to Neon PostgreSQL successfully!");
        }
        catch (error) {
            console.error("❌ Failed to connect:", error);
        }
    });
}
