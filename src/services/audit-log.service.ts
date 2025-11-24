import { AuditLog } from "../models/audit-log.model";

export interface AuditLogData {
  actorId: string;      
  action: string;       
  targetType: string;      
  targetId?: string | null; 
  description?: string;   
}

export const createAuditLog = async (data: AuditLogData & { actorRole?: string }) => {
  try {
    await AuditLog.create({
      actorId: data.actorId,
      actorRole: data.actorRole || "unknown",
      action: data.action,
      targetType: data.targetType,
      targetId: data.targetId || null,
      details: data.description || null,
    });
  } catch (error) {
    console.error("❌ Failed to create audit log:", error);
  }
};


