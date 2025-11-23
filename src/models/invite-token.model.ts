import { Table, Column, Model, DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "invite_tokens" })
export class InviteToken extends Model<InviteToken> {
    @Column({
        type: DataType.UUID,
        defaultValue: () => uuidv4(),
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
