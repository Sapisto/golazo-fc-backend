"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlayerSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(50).required(),
    lastName: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string().email().required(),
    position: joi_1.default.string().min(2).max(30).required(),
    teamId: joi_1.default.string().uuid().required(),
});
//# sourceMappingURL=player.validation.js.map