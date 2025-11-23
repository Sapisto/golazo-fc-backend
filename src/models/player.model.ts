import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    HasMany,
    DataType,
    Default,
} from "sequelize-typescript";
import { Team } from "./team.model";
import { Goal } from "./goal.model";
import { randomUUID } from "crypto";
import { User } from "./admin.model";

@Table({ tableName: "players" })
export class Player extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true
    })
    id!: string;

    @Column(DataType.STRING)
    firstName!: string;

    @Column(DataType.STRING)
    lastName!: string;

    @Column({ type: DataType.STRING, unique: true })
    email!: string;

    @Column(DataType.STRING)
    position!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isVerified!: boolean;

    @Default(0)
    @Column(DataType.INTEGER)
    goals!: number;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Team)
    @Column(DataType.UUID)
    teamId!: string;

    @BelongsTo(() => Team)
    team!: Team;

    @HasMany(() => Goal)
    goalsScored!: Goal[];
}
