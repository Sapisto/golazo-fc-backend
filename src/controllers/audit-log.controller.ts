// src/controllers/audit-log.controller.ts
import { Request, Response } from "express";
import { AuditLog } from "../models/audit-log.model";
import { calculateTotalPages, PageMeta, GeneralResponse } from "../services/response";
import { Op } from "sequelize";

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { actorId, action, targetType, startDate, endDate } = req.query;

    const where: any = {};

    if (actorId) where.actorId = actorId;
    if (action) where.action = action;
    if (targetType) where.targetType = targetType;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate as string);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate as string);
    }

    const totalRecords = await AuditLog.count({ where });

    const logs = await AuditLog.findAll({
      where,
      order: [["createdAt", "DESC"]],
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
    });

    const pageMeta: PageMeta = {
      pageNumber,
      pageSize,
      totalRecords,
      totalPages: calculateTotalPages(totalRecords, pageSize),
    };

    const response: GeneralResponse<typeof logs> = {
      succeeded: true,
      code: 200,
      message: "Audit logs fetched successfully",
      data: logs,
      pageMeta,
      errors: null,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to fetch audit logs",
      errors: [error.message],
    });
  }
};
