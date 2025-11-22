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
exports.Goal = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const player_model_1 = require("./player.model");
const match_model_1 = require("./match.model");
const uuid_1 = require("uuid");
let Goal = class Goal extends sequelize_typescript_1.Model {
};
exports.Goal = Goal;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: uuid_1.v4,
        primaryKey: true
    }),
    __metadata("design:type", String)
], Goal.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => player_model_1.Player),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Goal.prototype, "playerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => match_model_1.Match),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Goal.prototype, "matchId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Goal.prototype, "minute", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => player_model_1.Player),
    __metadata("design:type", player_model_1.Player)
], Goal.prototype, "player", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => match_model_1.Match),
    __metadata("design:type", match_model_1.Match)
], Goal.prototype, "match", void 0);
exports.Goal = Goal = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "goals" })
], Goal);
