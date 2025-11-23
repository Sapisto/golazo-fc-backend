import { Table, Column, Model, DataType } from "sequelize-typescript";
import { randomUUID } from "crypto";

@Table({ tableName: "invite_tokens" })
export class InviteToken extends Model<InviteToken> {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true,
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    token!: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    used!: boolean;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt!: Date;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt!: Date;
}
