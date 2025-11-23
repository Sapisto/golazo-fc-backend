"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const team_model_1 = require("./team.model");
const goal_model_1 = require("./goal.model");
const crypto_1 = require("crypto");
let Match = class Match extends sequelize_typescript_1.Model {
};
exports.Match = Match;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: () => (0, crypto_1.randomUUID)(),
        primaryKey: true
    }),
    __metadata("design:type", String)
], Match.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => team_model_1.Team),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Match.prototype, "homeTeamId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => team_model_1.Team),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Match.prototype, "awayTeamId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Match.prototype, "homeScore", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Match.prototype, "awayScore", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => team_model_1.Team, "homeTeamId"),
    __metadata("design:type", team_model_1.Team)
], Match.prototype, "homeTeam", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => team_model_1.Team, "awayTeamId"),
    __metadata("design:type", team_model_1.Team)
], Match.prototype, "awayTeam", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => goal_model_1.Goal),
    __metadata("design:type", Array)
], Match.prototype, "goals", void 0);
exports.Match = Match = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "matches" })
], Match);
//# sourceMappingURL=match.model.js.map