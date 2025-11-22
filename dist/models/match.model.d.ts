import { Model } from "sequelize-typescript";
import { Team } from "./team.model.js";
import { Goal } from "./goal.model.js";
export declare class Match extends Model {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeScore: number;
    awayScore: number;
    homeTeam: Team;
    awayTeam: Team;
    goals: Goal[];
}
//# sourceMappingURL=match.model.d.ts.map