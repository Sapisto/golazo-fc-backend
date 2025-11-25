// src/validation/validation.ts
import Joi from "joi";

// ---------------- PLAYER SCHEMAS ----------------
// Create Player Schema
export const createPlayerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(30).required(),
  teamName: Joi.string().min(2).max(100).required(),
  username: Joi.string().required(),
});

// Update Player Schema (all optional, but validated if present)
export const updatePlayerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  position: Joi.string().min(2).max(30).optional(),
  teamName: Joi.string().min(2).max(100).optional(),
  username: Joi.string().optional(),
});

// ---------------- TEAM SCHEMA ----------------
export const createTeamSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

// ---------------- LEADERBOARD SCHEMA ----------------
export const createLeaderboardEntrySchema = Joi.object({
  playerId: Joi.string().required(),
  teamId: Joi.string().required(),
  goals: Joi.number().min(0).optional().default(0),
  rcPoints: Joi.number().min(0).optional().default(0),
  totdPoints: Joi.number().min(0).optional().default(0),
  month: Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
    .required()
    .messages({
      "string.pattern.base": "Month must be in YYYY-MM format",
    }),
});

// ---------------- EXPORT ALL SCHEMAS ----------------
export const schemas = {
  createPlayerSchema,
  updatePlayerSchema,
  createTeamSchema,
  createLeaderboardEntrySchema,
};
