import { User } from "../models/admin.model";
import { Player } from "../models/player.model";
import { Team } from "../models/team.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendPlayerInviteEmail } from "../utils/emailService";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { sequelize } from "../config";
import { createAuditLog } from "../services/audit-log.service";

export const createPlayer = async (
  req: AuthRequest<{
    firstName: string;
    lastName: string;
    email: string;
    teamName: string;
    position: string;
    username?: string;
  }>,
  res: Response
) => {
  const t = await sequelize.transaction();

  try {
    const { firstName, lastName, email, teamName, position, username } =
      req.body;

    const team = await Team.findOne({ where: { name: teamName } });
    if (!team) {
      return res.status(400).json({
        succeeded: false,
        code: 400,
        message: "Team not found",
        errors: [`No team exists with name "${teamName}"`],
      });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        succeeded: false,
        code: 400,
        message: "Email already exists",
        errors: ["User with this email already exists"],
      });
    }

    if (username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({
          succeeded: false,
          code: 400,
          message: "Username already exists",
          errors: ["Username is already taken"],
        });
      }
    }

    const rawPassword = crypto.randomBytes(6).toString("hex");
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const generatedUsername =
      username || email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

    const user = await User.create(
      {
        name: `${firstName} ${lastName}`,
        email,
        username: generatedUsername,
        password: hashedPassword,
        role: "player",
        isActive: true,
      },
      { transaction: t }
    );

    const player = await Player.create(
      {
        firstName,
        lastName,
        email,
        position,
        teamId: team.id,
        userId: user.id,
        goals: 0,
        isVerified: false,
      },
      { transaction: t }
    );

    await t.commit();

    await sendPlayerInviteEmail(email, rawPassword, firstName);

    // 🔹 Audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "create_player",
      targetType: "Player",
      targetId: player.id,
      description: `Player ${firstName} ${lastName} created in team ${team.name}`,
    });

    return res.status(201).json({
      succeeded: true,
      code: 201,
      message: "Player created successfully",
      data: {
        player,
        loginDetails: { username: generatedUsername, password: rawPassword },
      },
    });
  } catch (error: any) {
    await t.rollback();

    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to create player",
      errors: [error.message],
    });
  }
};

// -------------------- Update Player --------------------
export const updatePlayer = async (
  req: AuthRequest<{
    firstName?: string;
    lastName?: string;
    email?: string;
    position?: string;
  }>,
  res: Response
) => {
  const t = await sequelize.transaction();
  try {
    const { playerId } = req.params;
    const { firstName, lastName, email, position } = req.body;

    const player = await Player.findByPk(playerId, { transaction: t });
    if (!player) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Player not found",
        errors: ["No player matches the given id"],
      });
    }

    // Update user email if provided
    if (email && email !== player.email) {
      const existingUser = await User.findOne({
        where: { email },
        transaction: t,
      });
      if (existingUser) {
        return res.status(400).json({
          succeeded: false,
          code: 400,
          message: "Email already exists",
          errors: ["Email already in use"],
        });
      }
      const user = await User.findByPk(player.userId, { transaction: t });
      if (user) user.email = email;
      await user?.save({ transaction: t });
      player.email = email;
    }

    if (firstName) player.firstName = firstName;
    if (lastName) player.lastName = lastName;
    if (position) player.position = position;

    await player.save({ transaction: t });
    await t.commit();

    // Audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "update_player",
      targetType: "Player",
      targetId: player.id,
      description: `Player ${player.firstName} ${player.lastName} updated`,
    });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Player updated successfully",
      data: player,
      errors: null,
    });
  } catch (error: any) {
    await t.rollback();
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to update player",
      errors: [error.message],
    });
  }
};

// -------------------- Delete Player --------------------
export const deletePlayer = async (req: AuthRequest, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { playerId } = req.params;
    const player = await Player.findByPk(playerId, { transaction: t });
    if (!player)
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Player not found",
        errors: ["No player matches the given id"],
      });

    // Delete user linked to player
    await User.destroy({ where: { id: player.userId }, transaction: t });
    await player.destroy({ transaction: t });
    await t.commit();

    // Audit log
    createAuditLog({
      actorId: req.user!.id,
      actorRole: req.user!.role,
      action: "delete_player",
      targetType: "Player",
      targetId: player.id,
      description: `Player ${player.firstName} ${player.lastName} deleted`,
    });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "Player deleted successfully",
      errors: null,
    });
  } catch (error: any) {
    await t.rollback();
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to delete player",
      errors: [error.message],
    });
  }
};


