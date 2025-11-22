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
exports.Player = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const team_model_1 = require("./team.model");
const goal_model_1 = require("./goal.model");
const uuid_1 = require("uuid");
let Player = class Player extends sequelize_typescript_1.Model {
};
exports.Player = Player;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true
    }),
    __metadata("design:type", String)
], Player.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Player.prototype, "goals", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => team_model_1.Team),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Player.prototype, "teamId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => team_model_1.Team),
    __metadata("design:type", team_model_1.Team)
], Player.prototype, "team", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => goal_model_1.Goal),
    __metadata("design:type", Array)
], Player.prototype, "goalsScored", void 0);
exports.Player = Player = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "players" })
], Player);
