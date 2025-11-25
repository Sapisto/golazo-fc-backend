import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    DataType,
    Default
} from "sequelize-typescript";
import { Player } from "./player.model";
import { Team } from "./team.model";
import { User } from "./admin.model";
import { randomUUID } from "crypto";

@Table({ tableName: "leaderboards" })
export class Leaderboard extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true,
    })
    id!: string;

    // 🔹 Player linked to leaderboard entry
    @ForeignKey(() => Player)
    @Column(DataType.UUID)
    playerId!: string;

    @BelongsTo(() => Player)
    player!: Player;

    // 🔹 Admin who created the entry
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    createdBy!: string;

    @BelongsTo(() => User)
    admin!: User;

    // 🔹 Team of the Day (team that earned TOTD points for this player)
    @ForeignKey(() => Team)
    @Column(DataType.UUID)
    teamId!: string;

    @BelongsTo(() => Team)
    team!: Team;

    // 🔹 Stats from PDF (all follow your exact pattern)
    @Default(0)
    @Column(DataType.INTEGER)
    goals!: number; // Highest Goal Scorer (+2)

    @Default(0)
    @Column(DataType.INTEGER)
    rcPoints!: number; // Red Card (-1)

    @Default(0)
    @Column(DataType.INTEGER)
    totdPoints!: number; // TOTD (+3)

    @Default(0)
    @Column(DataType.INTEGER)
    total!: number; // Sum of all points

    // 🔹 Month of leaderboard "2025-11"
    @Column(DataType.STRING)
    month!: string;
}
