"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = exports.createTeam = void 0;
const team_model_1 = require("../models/team.model");
// -------------------- Create Team --------------------
const createTeam = async (req, res, next) => {
    try {
        if (!req.adminId) {
            const response = {
                succeeded: false,
                code: 403,
                message: "Only admins can create teams",
                errors: ["Unauthorized"],
            };
            return res.status(403).json(response);
        }
        const { name } = req.body;
        // Check if team already exists
        const existingTeam = await team_model_1.Team.findOne({ where: { name } });
        if (existingTeam) {
            const response = {
                succeeded: false,
                code: 400,
                message: "Team already exists",
                errors: ["Duplicate team name"],
            };
            return res.status(400).json(response);
        }
        const team = await team_model_1.Team.create({ name });
        const response = {
            succeeded: true,
            code: 201,
            message: "Team created successfully",
            data: team,
            errors: null,
        };
        return res.status(201).json(response);
    }
    catch (error) {
        const response = {
            succeeded: false,
            code: 500,
            message: "Failed to create team",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};
exports.createTeam = createTeam;
// -------------------- Get All Teams --------------------
const getTeams = async (req, res, next) => {
    try {
        const teams = await team_model_1.Team.findAll({ attributes: ["id", "name"] });
        const response = {
            succeeded: true,
            code: 200,
            message: "Teams fetched successfully",
            data: teams,
            errors: null
        };
        return res.status(200).json(response);
    }
    catch (error) {
        const response = {
            succeeded: false,
            code: 500,
            message: "Failed to fetch teams",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};
exports.getTeams = getTeams;
//# sourceMappingURL=team.controller.js.map