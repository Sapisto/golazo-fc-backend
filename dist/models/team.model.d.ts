import { Model } from "sequelize-typescript";
import { Player } from "./player.model";
import { Match } from "./match.model";
export declare class Team extends Model {
    id: string;
    name: string;
    players: Player[];
    homeMatches: Match[];
    awayMatches: Match[];
}
