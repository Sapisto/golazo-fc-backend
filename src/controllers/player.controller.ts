import bcrypt from "bcryptjs";
import { Player } from "../models/player.model";
import {
  calculateTotalPages,
  GeneralResponse,
  PageMeta,
} from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Team } from "../models/team.model";
import { Match } from "../models/match.model";
import { createAuditLog } from "../services/audit-log.service";



// -------------------- Get Players by Team --------------------
export const getPlayersByTeam = async (req: AuthRequest, res: Response) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);
    if (!team)
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Team not found",
        errors: ["No team matches the given id"],
      });

    const players = await Player.findAll({ where: { teamId } });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: `Players for team ${team.name} fetched successfully`,
      data: players,
      errors: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to fetch players",
      errors: [error.message],
    });
  }
};