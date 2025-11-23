import bcrypt from "bcryptjs";
import { Player } from "../models/player.model";
import { GeneralResponse } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Team } from "../models/team.model";
// -------------------- Create Team --------------------
export const createTeam = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.adminId) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 403,
                message: "Only admins can create teams",
                errors: ["Unauthorized"],
            };
            return res.status(403).json(response);
        }

        const { name } = req.body;

        // Check if team already exists
        const existingTeam = await Team.findOne({ where: { name } });
        if (existingTeam) {
            const response: GeneralResponse<null> = {
                succeeded: false,
                code: 400,
                message: "Team already exists",
                errors: ["Duplicate team name"],
            };
            return res.status(400).json(response);
        }

        const team = await Team.create({ name });

        const response: GeneralResponse<typeof team> = {
            succeeded: true,
            code: 201,
            message: "Team created successfully",
            data: team,
            errors: null,
        };

        return res.status(201).json(response);
    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: "Failed to create team",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};


// -------------------- Get All Teams --------------------
export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await Team.findAll({ attributes: ["id", "name"] });

        const response: GeneralResponse<typeof teams> = {
            succeeded: true,
            code: 200,
            message: "Teams fetched successfully",
            data: teams,
            errors: null
        };

        return res.status(200).json(response);

    } catch (error: any) {
        const response: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: "Failed to fetch teams",
            errors: [error.message],
        };
        return res.status(500).json(response);
    }
};