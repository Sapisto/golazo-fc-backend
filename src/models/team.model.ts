import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { Player } from "./player.model";
import { Match } from "./match.model";
import { randomUUID } from "crypto";

@Table({ tableName: "teams" })
export class Team extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @HasMany(() => Player)
    players!: Player[];

    @HasMany(() => Match, "homeTeamId")
    homeMatches!: Match[];

    @HasMany(() => Match, "awayTeamId")
    awayMatches!: Match[];
}
