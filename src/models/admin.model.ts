import { Table, Column, Model, DataType } from "sequelize-typescript";
import { randomUUID } from "crypto";

// Define attributes required when creating Admin
interface AdminCreationAttributes {
    name: string;
    username: string;
    email: string;
    password: string;
    isActive?: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, AdminCreationAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: () => randomUUID(),
        primaryKey: true,
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    username!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive!: boolean;
}
