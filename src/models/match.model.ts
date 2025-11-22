import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "matches" })
export class Match extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => uuidv4(),
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

    @BelongsTo(() => Team, "homeTeamId")
    homeTeam!: Team;

    @BelongsTo(() => Team, "awayTeamId")
    awayTeam!: Team;

    @HasMany(() => Goal)
    goals!: Goal[];
}
