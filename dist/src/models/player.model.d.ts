import { Model } from "sequelize-typescript";
import { Team } from "./team.model.js";
import { Goal } from "./goal.model.js";
export declare class Player extends Model {
    id: string;
    name: string;
    goals: number;
    teamId: string;
    team: Team;
    goalsScored: Goal[];
}
//# sourceMappingURL=player.model.d.ts.map