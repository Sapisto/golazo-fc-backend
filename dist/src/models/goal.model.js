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
import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Player } from "./player.model";
import { Match } from "./match.model";
import { v4 as uuidv4 } from "uuid";
let Goal = (() => {
    let _classDecorators = [Table({ tableName: "goals" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _playerId_decorators;
    let _playerId_initializers = [];
    let _playerId_extraInitializers = [];
    let _matchId_decorators;
    let _matchId_initializers = [];
    let _matchId_extraInitializers = [];
    let _minute_decorators;
    let _minute_initializers = [];
    let _minute_extraInitializers = [];
    let _player_decorators;
    let _player_initializers = [];
    let _player_extraInitializers = [];
    let _match_decorators;
    let _match_initializers = [];
    let _match_extraInitializers = [];
    var Goal = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.playerId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _playerId_initializers, void 0));
            this.matchId = (__runInitializers(this, _playerId_extraInitializers), __runInitializers(this, _matchId_initializers, void 0));
            this.minute = (__runInitializers(this, _matchId_extraInitializers), __runInitializers(this, _minute_initializers, void 0));
            this.player = (__runInitializers(this, _minute_extraInitializers), __runInitializers(this, _player_initializers, void 0));
            this.match = (__runInitializers(this, _player_extraInitializers), __runInitializers(this, _match_initializers, void 0));
            __runInitializers(this, _match_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Goal");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _id_decorators = [Column({
                type: DataType.UUID,
                defaultValue: uuidv4,
                primaryKey: true
            })];
        _playerId_decorators = [ForeignKey(() => Player), Column({ type: DataType.UUID, allowNull: false })];
        _matchId_decorators = [ForeignKey(() => Match), Column({ type: DataType.UUID, allowNull: false })];
        _minute_decorators = [Column({ type: DataType.INTEGER, allowNull: false })];
        _player_decorators = [BelongsTo(() => Player)];
        _match_decorators = [BelongsTo(() => Match)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _playerId_decorators, { kind: "field", name: "playerId", static: false, private: false, access: { has: obj => "playerId" in obj, get: obj => obj.playerId, set: (obj, value) => { obj.playerId = value; } }, metadata: _metadata }, _playerId_initializers, _playerId_extraInitializers);
        __esDecorate(null, null, _matchId_decorators, { kind: "field", name: "matchId", static: false, private: false, access: { has: obj => "matchId" in obj, get: obj => obj.matchId, set: (obj, value) => { obj.matchId = value; } }, metadata: _metadata }, _matchId_initializers, _matchId_extraInitializers);
        __esDecorate(null, null, _minute_decorators, { kind: "field", name: "minute", static: false, private: false, access: { has: obj => "minute" in obj, get: obj => obj.minute, set: (obj, value) => { obj.minute = value; } }, metadata: _metadata }, _minute_initializers, _minute_extraInitializers);
        __esDecorate(null, null, _player_decorators, { kind: "field", name: "player", static: false, private: false, access: { has: obj => "player" in obj, get: obj => obj.player, set: (obj, value) => { obj.player = value; } }, metadata: _metadata }, _player_initializers, _player_extraInitializers);
        __esDecorate(null, null, _match_decorators, { kind: "field", name: "match", static: false, private: false, access: { has: obj => "match" in obj, get: obj => obj.match, set: (obj, value) => { obj.match = value; } }, metadata: _metadata }, _match_initializers, _match_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Goal = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Goal = _classThis;
})();
export { Goal };
//# sourceMappingURL=goal.model.js.map