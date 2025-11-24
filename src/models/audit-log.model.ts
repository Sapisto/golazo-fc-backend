// src/models/audit-log.model.ts
import { Model, Table, Column, DataType, ForeignKey, CreatedAt } from "sequelize-typescript";
import { User } from "./admin.model";

@Table({ tableName: "audit_logs" })
export class AuditLog extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  actorId!: string;

  @Column({ type: DataType.STRING })
  actorRole!: string;

  @Column({ type: DataType.STRING })
  action!: string;

  @Column({ type: DataType.STRING })
  targetType!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  targetId?: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  details?: any;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;
}
