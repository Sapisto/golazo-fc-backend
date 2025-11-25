import bcrypt from "bcryptjs";
import { Player } from "../models/player.model";
import {
  calculateTotalPages,
  GeneralResponse,
  PageMeta,
} from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
import { Team } from "../models/team.model";
import { Match } from "../models/match.model";
import { createAuditLog } from "../services/audit-log.service";
import { User } from "../models/admin.model";

// -------------------- Create Team --------------------

export const createTeam = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const existingTeam = await Team.findOne({ where: { name } });
    if (existingTeam) {
      return res.status(400).json({
        succeeded: false,
        code: 400,
        message: "Team already exists",
        errors: ["Duplicate team name"],
      });
    }

    const team = await Team.create({ name });

    // 🔹 Audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "create_team",
      targetType: "Team",
      targetId: team.id,
      description: `Team ${name} created`,
    });

    return res.status(201).json({
      succeeded: true,
      code: 201,
      message: "Team created successfully",
      data: team,
      errors: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to create team",
      errors: [error.message],
    });
  }
};

// -------------------- Get All Teams --------------------
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  const pageNumber = parseInt(req.query.pageNumber as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  try {
    const totalRecords = await Team.count();

    const teams = await Team.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Player,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "position",
            "goals",
            "userId",
          ],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
          separate: true,
        },
        {
          model: Match,
          as: "homeMatches",
          attributes: ["id", "homeScore", "awayScore", "matchDate"],
          separate: true,
        },
        {
          model: Match,
          as: "awayMatches",
          attributes: ["id", "homeScore", "awayScore", "matchDate"],
          separate: true,
        },
      ],
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      order: [["name", "ASC"]],
    });

    const enrichedTeams = teams.map((team: any) => {
      const players = team.players || [];
      const totalGoals = players.reduce(
        (sum: number, player: any) => sum + (player.goals || 0),
        0
      );

      return {
        id: team.id,
        teamName: team.name,
        players,
        totalPlayers: players.length,
        totalGoals,
        totalMatches:
          (team.homeMatches?.length || 0) + (team.awayMatches?.length || 0),
        homeMatches: team.homeMatches || [],
        awayMatches: team.awayMatches || [],
      };
    });

    const pageMeta: PageMeta = {
      pageNumber,
      pageSize,
      totalRecords,
      totalPages: calculateTotalPages(totalRecords, pageSize),
    };

    res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Fetched all teams with details",
      data: enrichedTeams,
      errors: null,
      pageMeta,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      code: 500,
      message: `Error fetching teams: ${(error as Error).message}`,
      data: null,
      errors: [(error as Error).message],
    });
  }
};

// -------------------- Get Team by ID or Name --------------------
export const getTeamByIdOrName = async (req: Request, res: Response) => {
  const { id, name } = req.query;

  if (!id && !name) {
    return res.status(400).json({
      succeeded: false,
      code: 400,
      message: "Provide either a team id or team name",
      data: null,
      errors: ["Missing query parameter: team Id or name"],
    });
  }

  try {
    const team = await Team.findOne({
      where: id ? { id } : { name },
      include: [
        {
          model: Player,
          attributes: ["id", "firstName", "lastName", "position", "goals"],
          separate: true,
        },
        {
          model: Match,
          as: "homeMatches",
          attributes: ["id", "homeScore", "awayScore", "matchDate"],
          separate: true,
        },
        {
          model: Match,
          as: "awayMatches",
          attributes: ["id", "homeScore", "awayScore", "matchDate"],
          separate: true,
        },
      ],
    });

    if (!team) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Team not found",
        data: null,
        errors: ["No team matches the given id or name"],
      });
    }

    const players = team.players || [];
    const totalGoals = players.reduce(
      (sum: number, player: any) => sum + (player.goals || 0),
      0
    );

    const responseData = {
      id: team.id,
      teamName: team.name,
      // players,
      totalPlayers: players.length,
      totalGoals,
      totalMatches:
        (team.homeMatches?.length || 0) + (team.awayMatches?.length || 0),
      homeMatches: team.homeMatches || [],
      awayMatches: team.awayMatches || [],
    };

    res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Team fetched successfully",
      data: responseData,
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      code: 500,
      message: `Error fetching team: ${(error as Error).message}`,
      data: null,
      errors: [(error as Error).message],
    });
  }
};

// -------------------- Delete Team --------------------
export const deleteTeam = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Team not found",
        errors: ["Invalid team ID"],
      });
    }

    await team.destroy();

    // 🔹 Audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "delete_team",
      targetType: "Team",
      targetId: id,
      description: `Team ${team.name} deleted`,
    });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Team deleted successfully",
      data: null,
      errors: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to delete team",
      errors: [error.message],
    });
  }
};
