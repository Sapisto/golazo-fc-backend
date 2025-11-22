import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "players" })
export class Player extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    goals!: number;

    @ForeignKey(() => Team)
    @Column({ type: DataType.UUID, allowNull: false })
    teamId!: string;

    @BelongsTo(() => Team)
    team!: Team;

    @HasMany(() => Goal)
    goalsScored!: Goal[];
}
