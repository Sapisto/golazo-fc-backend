import Joi from "joi";

export const createPlayerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    position: Joi.string().min(2).max(30).required(),
    teamId: Joi.string().uuid().required(),
    username: Joi.string().optional(), // NEW

});
