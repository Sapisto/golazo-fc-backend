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

@Table({ tableName: "players" })
export class Player extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    position!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    password!: string | null;

    @Default(false)
    @Column({ type: DataType.BOOLEAN })
    isVerified!: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    verificationToken!: string | null;

    @Column({ type: DataType.DATE, allowNull: true })
    tokenExpires!: Date | null;

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
