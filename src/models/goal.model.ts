import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Player } from "./player.model";
import { Match } from "./match.model";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "goals" })
export class Goal extends Model<Goal> {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    })
    id!: string;

    @ForeignKey(() => Player)
    @Column({ type: DataType.UUID, allowNull: false })
    playerId!: string;

    @ForeignKey(() => Match)
    @Column({ type: DataType.UUID, allowNull: false })
    matchId!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    minute!: number;

    @BelongsTo(() => Player)
    player!: Player;

    @BelongsTo(() => Match)
    match!: Match;
}
