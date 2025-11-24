import { User } from "../models/admin.model";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { generateToken } from "../services/auth.service";
import { createAuditLog } from "../services/audit-log.service";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/emailService";

export const userLogin = async (
  req: AuthRequest<{ email: string; password: string }>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        succeeded: false,
        code: 401,
        message: "Invalid email or password",
        errors: ["User not found"],
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        succeeded: false,
        code: 401,
        message: "Invalid email or password",
        errors: ["Wrong password"],
      });
    }

    const token = generateToken({ id: user.id, role: user.role });
    // Audmit Logs

    createAuditLog({
      actorId: user.id,
      actorRole: user.role,
      action: "login",
      targetType: "User",
      description: `User ${email} logged in`,
    });

    return res.json({
      succeeded: true,
      code: 200,
      message: "Login successful",
      data: { token, role: user.role },
      errors: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to login",
      errors: [error.message],
    });
  }
};

export const resetPassword = async (
  req: AuthRequest<{ email: string }>,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "Email not found",
        errors: ["No user exists with this email"],
      });
    }

    const newPassword = crypto.randomBytes(6).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    await sendPasswordResetEmail(email, newPassword);

    // Audit Logs
    createAuditLog({
      actorId: user.id,
      actorRole: user.role,
      action: "reset_password",
      targetType: "User",
    //   targetId: user.id,
      description: `Password reset for ${email}`,
    });

    return res.status(200).json({
      succeeded: true,
      code: 200,
      message: "A new password has been sent to your email",
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to reset password",
      errors: [error.message],
    });
  }
};

export const changePassword = async (
  req: AuthRequest<{ oldPassword: string; newPassword: string }>,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        succeeded: false,
        code: 404,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        succeeded: false,
        code: 400,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    // Audit Logs
    createAuditLog({
      actorId: user.id,
      actorRole: user.role,
      action: "change_password",
      targetType: "User",
      targetId: user.id,
      description: `User changed password successfully`,
    });

    return res.json({
      succeeded: true,
      code: 200,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      succeeded: false,
      code: 500,
      message: "Failed to change password",
      errors: [error.message],
    });
  }
};