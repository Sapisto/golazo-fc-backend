import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
import { randomUUID } from "crypto";

@Table({ tableName: "matches" })
export class Match extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true
    })
    id!: string;

    @ForeignKey(() => Team)
    @Column({ type: DataType.UUID, allowNull: false })
    homeTeamId!: string;

    @ForeignKey(() => Team)
    @Column({ type: DataType.UUID, allowNull: false })
    awayTeamId!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    homeScore!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    awayScore!: number;

    @Column({ type: DataType.DATE, allowNull: false })
    matchDate!: Date;

    @BelongsTo(() => Team, "homeTeamId")
    homeTeam!: Team;

    @BelongsTo(() => Team, "awayTeamId")
    awayTeam!: Team;

    @HasMany(() => Goal)
    goals!: Goal[];
}
