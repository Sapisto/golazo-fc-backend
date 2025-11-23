import { Model } from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
export declare class Player extends Model {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    password: string | null;
    isVerified: boolean;
    verificationToken: string | null;
    tokenExpires: Date | null;
    goals: number;
    teamId: string;
    team: Team;
    goalsScored: Goal[];
}
