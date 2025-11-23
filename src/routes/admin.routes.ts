// import express from "express";
// import { adminLogin } from "../controllers/admin.controller";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Admin
//  */

// /**
//  * @swagger
//  * /api/admin/login:
//  *   post:
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [email, password]
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: admin@example.com
//  *               password:
//  *                 type: string
//  *                 example: Pass1234
//  *     responses:
//  *       200:
//  *         description: Successful login
//  *       401:
//  *         description: Invalid credentials
//  */
// router.post("/login", adminLogin);

// export default router;
