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
import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Player } from "./player.model.js";
import { Match } from "./match.model.js";
import { v4 as uuidv4 } from "uuid";
let Team = (() => {
    let _classDecorators = [Table({ tableName: "teams" })];
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
    let _players_decorators;
    let _players_initializers = [];
    let _players_extraInitializers = [];
    let _homeMatches_decorators;
    let _homeMatches_initializers = [];
    let _homeMatches_extraInitializers = [];
    let _awayMatches_decorators;
    let _awayMatches_initializers = [];
    let _awayMatches_extraInitializers = [];
    var Team = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.players = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _players_initializers, void 0));
            this.homeMatches = (__runInitializers(this, _players_extraInitializers), __runInitializers(this, _homeMatches_initializers, void 0));
            this.awayMatches = (__runInitializers(this, _homeMatches_extraInitializers), __runInitializers(this, _awayMatches_initializers, void 0));
            __runInitializers(this, _awayMatches_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Team");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _id_decorators = [Column({
                type: DataType.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true
            })];
        _name_decorators = [Column({ type: DataType.STRING, allowNull: false })];
        _players_decorators = [HasMany(() => Player)];
        _homeMatches_decorators = [HasMany(() => Match, "homeTeamId")];
        _awayMatches_decorators = [HasMany(() => Match, "awayTeamId")];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _players_decorators, { kind: "field", name: "players", static: false, private: false, access: { has: obj => "players" in obj, get: obj => obj.players, set: (obj, value) => { obj.players = value; } }, metadata: _metadata }, _players_initializers, _players_extraInitializers);
        __esDecorate(null, null, _homeMatches_decorators, { kind: "field", name: "homeMatches", static: false, private: false, access: { has: obj => "homeMatches" in obj, get: obj => obj.homeMatches, set: (obj, value) => { obj.homeMatches = value; } }, metadata: _metadata }, _homeMatches_initializers, _homeMatches_extraInitializers);
        __esDecorate(null, null, _awayMatches_decorators, { kind: "field", name: "awayMatches", static: false, private: false, access: { has: obj => "awayMatches" in obj, get: obj => obj.awayMatches, set: (obj, value) => { obj.awayMatches = value; } }, metadata: _metadata }, _awayMatches_initializers, _awayMatches_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Team = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Team = _classThis;
})();
export { Team };
//# sourceMappingURL=team.model.js.map