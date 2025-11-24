// src/validation/validation.ts
import Joi from "joi";

// Create Player Schema
export const createPlayerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(30).required(),
  teamName: Joi.string().min(2).max(100).required(),
  username: Joi.string().optional(),
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

// Create Team Schema
export const createTeamSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});


export const schemas = {
  createPlayerSchema,
  updatePlayerSchema,
  createTeamSchema,
};
