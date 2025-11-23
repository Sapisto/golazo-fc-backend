import { Model } from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
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
