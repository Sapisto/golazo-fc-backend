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
let Player = (() => {
    let _classDecorators = [Table({ tableName: "players" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _goals_decorators;
    let _goals_initializers = [];
    let _goals_extraInitializers = [];
    let _teamId_decorators;
    let _teamId_initializers = [];
    let _teamId_extraInitializers = [];
    let _team_decorators;
    let _team_initializers = [];
    let _team_extraInitializers = [];
    let _goalsScored_decorators;
    let _goalsScored_initializers = [];
    let _goalsScored_extraInitializers = [];
    var Player = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.goals = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _goals_initializers, void 0));
            this.teamId = (__runInitializers(this, _goals_extraInitializers), __runInitializers(this, _teamId_initializers, void 0));
            this.team = (__runInitializers(this, _teamId_extraInitializers), __runInitializers(this, _team_initializers, void 0));
            this.goalsScored = (__runInitializers(this, _team_extraInitializers), __runInitializers(this, _goalsScored_initializers, void 0));
            __runInitializers(this, _goalsScored_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Player");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _id_decorators = [Column({
                type: DataType.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true
            })];
        _name_decorators = [Column({ type: DataType.STRING, allowNull: false })];
        _goals_decorators = [Column({ type: DataType.INTEGER, defaultValue: 0 })];
        _teamId_decorators = [ForeignKey(() => Team), Column({ type: DataType.UUID, allowNull: false })];
        _team_decorators = [BelongsTo(() => Team)];
        _goalsScored_decorators = [HasMany(() => Goal)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _goals_decorators, { kind: "field", name: "goals", static: false, private: false, access: { has: obj => "goals" in obj, get: obj => obj.goals, set: (obj, value) => { obj.goals = value; } }, metadata: _metadata }, _goals_initializers, _goals_extraInitializers);
        __esDecorate(null, null, _teamId_decorators, { kind: "field", name: "teamId", static: false, private: false, access: { has: obj => "teamId" in obj, get: obj => obj.teamId, set: (obj, value) => { obj.teamId = value; } }, metadata: _metadata }, _teamId_initializers, _teamId_extraInitializers);
        __esDecorate(null, null, _team_decorators, { kind: "field", name: "team", static: false, private: false, access: { has: obj => "team" in obj, get: obj => obj.team, set: (obj, value) => { obj.team = value; } }, metadata: _metadata }, _team_initializers, _team_extraInitializers);
        __esDecorate(null, null, _goalsScored_decorators, { kind: "field", name: "goalsScored", static: false, private: false, access: { has: obj => "goalsScored" in obj, get: obj => obj.goalsScored, set: (obj, value) => { obj.goalsScored = value; } }, metadata: _metadata }, _goalsScored_initializers, _goalsScored_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Player = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Player = _classThis;
})();
export { Player };
//# sourceMappingURL=player.model.js.map