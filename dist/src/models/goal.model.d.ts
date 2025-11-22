import { Model } from "sequelize-typescript";
import { Player } from "./player.model";
import { Match } from "./match.model";
export declare class Goal extends Model<Goal> {
    id: string;
    playerId: string;
    matchId: string;
    minute: number;
    player: Player;
    match: Match;
}
//# sourceMappingURL=goal.model.d.ts.map