import bcrypt from "bcryptjs";
import { Player } from "../models/player.model";
import { calculateTotalPages, GeneralResponse, PageMeta } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Team } from "../models/team.model";
// -------------------- Create Team --------------------
export const createTeam = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

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
export const getTeams = async (
    req: Request,
    res: Response
): Promise<void> => {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const totalRecords = await Team.count();

        const teams = await Team.findAll({
            attributes: ["id", "name"],
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            order: [["name", "ASC"]],
        });

        const pageMeta: PageMeta = {
            pageNumber,
            pageSize,
            totalRecords,
            totalPages: calculateTotalPages(totalRecords, pageSize),
        };

        const pagedResponse: GeneralResponse<any[]> = {
            succeeded: true,
            code: 200,
            message: "Fetched all teams",
            data: teams,
            errors: null,
            pageMeta,
        };

        res.status(200).json(pagedResponse);
    } catch (error) {
        const errorResponse: GeneralResponse<null> = {
            succeeded: false,
            code: 500,
            message: `Error fetching teams: ${(error as Error).message}`,
            data: null,
            errors: null,
            // pageMeta: null,
        };
        res.status(500).json(errorResponse);
    }
};
