import { Table, Column, Model, DataType, Default, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { randomUUID } from "crypto";
import { Player } from "./player.model";

export type UserRole = "super-admin" | "admin" | "player";

interface UserCreationAttributes {
    name: string;
    username?: string;
    email: string;
    password: string;
    role: UserRole;
    isActive?: boolean;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true,
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: true, unique: true })
    username?: string; // optional for players

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    isActive!: boolean;

    @Default("player")
    @Column({ type: DataType.ENUM("super-admin", "admin", "player") })
    role!: UserRole;

    @HasMany(() => Player)
    playerProfile?: Player[];
}
