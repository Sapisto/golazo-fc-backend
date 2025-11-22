var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import { Team } from "./team.model.js";
import { Goal } from "./goal.model.js";
import { v4 as uuidv4 } from "uuid";
let Match = (() => {
    let _classDecorators = [Table({ tableName: "matches" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _homeTeamId_decorators;
    let _homeTeamId_initializers = [];
    let _homeTeamId_extraInitializers = [];
    let _awayTeamId_decorators;
    let _awayTeamId_initializers = [];
    let _awayTeamId_extraInitializers = [];
    let _homeScore_decorators;
    let _homeScore_initializers = [];
    let _homeScore_extraInitializers = [];
    let _awayScore_decorators;
    let _awayScore_initializers = [];
    let _awayScore_extraInitializers = [];
    let _homeTeam_decorators;
    let _homeTeam_initializers = [];
    let _homeTeam_extraInitializers = [];
    let _awayTeam_decorators;
    let _awayTeam_initializers = [];
    let _awayTeam_extraInitializers = [];
    let _goals_decorators;
    let _goals_initializers = [];
    let _goals_extraInitializers = [];
    var Match = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.homeTeamId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _homeTeamId_initializers, void 0));
            this.awayTeamId = (__runInitializers(this, _homeTeamId_extraInitializers), __runInitializers(this, _awayTeamId_initializers, void 0));
            this.homeScore = (__runInitializers(this, _awayTeamId_extraInitializers), __runInitializers(this, _homeScore_initializers, void 0));
            this.awayScore = (__runInitializers(this, _homeScore_extraInitializers), __runInitializers(this, _awayScore_initializers, void 0));
            this.homeTeam = (__runInitializers(this, _awayScore_extraInitializers), __runInitializers(this, _homeTeam_initializers, void 0));
            this.awayTeam = (__runInitializers(this, _homeTeam_extraInitializers), __runInitializers(this, _awayTeam_initializers, void 0));
            this.goals = (__runInitializers(this, _awayTeam_extraInitializers), __runInitializers(this, _goals_initializers, void 0));
            __runInitializers(this, _goals_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Match");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _id_decorators = [Column({
                type: DataType.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true
            })];
        _homeTeamId_decorators = [ForeignKey(() => Team), Column({ type: DataType.UUID, allowNull: false })];
        _awayTeamId_decorators = [ForeignKey(() => Team), Column({ type: DataType.UUID, allowNull: false })];
        _homeScore_decorators = [Column({ type: DataType.INTEGER, defaultValue: 0 })];
        _awayScore_decorators = [Column({ type: DataType.INTEGER, defaultValue: 0 })];
        _homeTeam_decorators = [BelongsTo(() => Team, "homeTeamId")];
        _awayTeam_decorators = [BelongsTo(() => Team, "awayTeamId")];
        _goals_decorators = [HasMany(() => Goal)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _homeTeamId_decorators, { kind: "field", name: "homeTeamId", static: false, private: false, access: { has: obj => "homeTeamId" in obj, get: obj => obj.homeTeamId, set: (obj, value) => { obj.homeTeamId = value; } }, metadata: _metadata }, _homeTeamId_initializers, _homeTeamId_extraInitializers);
        __esDecorate(null, null, _awayTeamId_decorators, { kind: "field", name: "awayTeamId", static: false, private: false, access: { has: obj => "awayTeamId" in obj, get: obj => obj.awayTeamId, set: (obj, value) => { obj.awayTeamId = value; } }, metadata: _metadata }, _awayTeamId_initializers, _awayTeamId_extraInitializers);
        __esDecorate(null, null, _homeScore_decorators, { kind: "field", name: "homeScore", static: false, private: false, access: { has: obj => "homeScore" in obj, get: obj => obj.homeScore, set: (obj, value) => { obj.homeScore = value; } }, metadata: _metadata }, _homeScore_initializers, _homeScore_extraInitializers);
        __esDecorate(null, null, _awayScore_decorators, { kind: "field", name: "awayScore", static: false, private: false, access: { has: obj => "awayScore" in obj, get: obj => obj.awayScore, set: (obj, value) => { obj.awayScore = value; } }, metadata: _metadata }, _awayScore_initializers, _awayScore_extraInitializers);
        __esDecorate(null, null, _homeTeam_decorators, { kind: "field", name: "homeTeam", static: false, private: false, access: { has: obj => "homeTeam" in obj, get: obj => obj.homeTeam, set: (obj, value) => { obj.homeTeam = value; } }, metadata: _metadata }, _homeTeam_initializers, _homeTeam_extraInitializers);
        __esDecorate(null, null, _awayTeam_decorators, { kind: "field", name: "awayTeam", static: false, private: false, access: { has: obj => "awayTeam" in obj, get: obj => obj.awayTeam, set: (obj, value) => { obj.awayTeam = value; } }, metadata: _metadata }, _awayTeam_initializers, _awayTeam_extraInitializers);
        __esDecorate(null, null, _goals_decorators, { kind: "field", name: "goals", static: false, private: false, access: { has: obj => "goals" in obj, get: obj => obj.goals, set: (obj, value) => { obj.goals = value; } }, metadata: _metadata }, _goals_initializers, _goals_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Match = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Match = _classThis;
})();
export { Match };
//# sourceMappingURL=match.model.js.map