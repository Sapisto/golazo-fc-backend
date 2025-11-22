import { Model } from "sequelize-typescript";
import { Player } from "./player.model.js";
import { Match } from "./match.model.js";
export declare class Team extends Model {
    id: string;
    name: string;
    players: Player[];
    homeMatches: Match[];
    awayMatches: Match[];
}
//# sourceMappingURL=team.model.d.ts.map