import { Request, Response } from "express";
import { Leaderboard } from "../models/leaderboard.model";
import { Player } from "../models/player.model";
import { Team } from "../models/team.model";
import { User } from "../models/admin.model";
import { sequelize } from "../config";
import { calculateTotalPages } from "../services/response";
import { AuthRequest } from "../middleware/auth.middleware";
import { createAuditLog } from "../services/audit-log.service";

// ---------------- CREATE ENTRY (ADMIN) ----------------

export const createLeaderboardEntry = async (
  req: AuthRequest<{
    playerId: string;
    teamId: string;
    goals?: number;
    rcPoints?: number;
    totdPoints?: number;
    month: string; // Format: "YYYY-MM"
  }>,
  res: Response
) => {
  const t = await sequelize.transaction(); // Start transaction

  try {
    const { playerId, teamId, goals = 0, rcPoints = 0, totdPoints = 0, month } = req.body;

    // 🔹 Validate player
    const player = await Player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Player not found",
        errors: ["Invalid playerId"],
      });
    }

    // 🔹 Validate team
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Team not found",
        errors: ["Invalid teamId"],
      });
    }

    // 🔹 Optional: Ensure the player belongs to this team
    if (player.teamId !== team.id) {
      return res.status(400).json({
        succeeded: false,
        code: 400,
        message: "Player does not belong to the specified team",
        errors: ["Invalid team-player combination"],
      });
    }

    // 🔹 Calculate total points
    const total = goals + rcPoints + totdPoints;

    // 🔹 Create leaderboard entry
    const entry = await Leaderboard.create(
      {
        playerId,
        teamId,
        goals,
        rcPoints,
        totdPoints,
        total,
        month,
        createdBy: req.user!.id,
      },
      { transaction: t }
    );

    await t.commit();

    // 🔹 Create audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "create_leaderboard_entry",
      targetType: "Leaderboard",
      targetId: entry.id,
      description: `Leaderboard entry created for player ${player.firstName} ${player.lastName}`,
    });

    return res.status(201).json({
      succeeded: true,
      code: 201,
      message: "Leaderboard entry created successfully",
      data: entry,
    });
  } catch (error: any) {
    await t.rollback();
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to create leaderboard entry",
      errors: [error.message],
    });
  }
};


// -------------------- GET LEADERBOARD BY MONTH (PLAYER + ADMIN) --------------------
export const getLeaderboardByMonth = async (req: Request, res: Response) => {
  try {
    const { month } = req.params;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const offset = (pageNumber - 1) * pageSize;

    const { count, rows } = await Leaderboard.findAndCountAll({
      where: { month },
      include: [
        { model: Player, attributes: ["id", "firstName", "lastName", "position", "email"] },
        { model: Team, attributes: ["id", "name"] },
        { model: User, attributes: ["id", "name"], as: "admin" },
      ],
      order: [["total", "DESC"]],
      limit: pageSize,
      offset,
    });

    const totalPages = calculateTotalPages(count, pageSize);

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Leaderboard fetched successfully",
      data: rows,
      pageMeta: {
        pageNumber,
        pageSize,
        totalRecords: count,
        totalPages,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to fetch leaderboard",
      errors: [error.message],
    });
  }
};

// -------------------- GET CURRENT MONTH LEADERBOARD (PLAYER) --------------------
export const getCurrentLeaderboard = async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const entries = await Leaderboard.findAll({
      where: { month },
      include: [
        { model: Player, attributes: ["id", "firstName", "lastName", "position"] },
        { model: Team, attributes: ["id", "name"] },
      ],
      order: [["total", "DESC"]],
    });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Current leaderboard fetched",
      data: entries,
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to fetch leaderboard",
      errors: [error.message],
    });
  }
};
