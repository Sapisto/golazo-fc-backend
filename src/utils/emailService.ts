import nodemailer from "nodemailer";

export const sendPlayerInviteEmail = async (email: string, token: string) => {
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";
    const link = `${FRONTEND_URL}/create-password/${token}`;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Create Your Golazo FC Account</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            h2 {
                color: #333333;
            }
            p {
                color: #555555;
                line-height: 1.6;
            }
            a.button {
                display: inline-block;
                padding: 12px 24px;
                margin-top: 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 6px;
            }
            a.button:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999999;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome to Golazo FC!</h2>
            <p>Hello Player,</p>
            <p>An admin has registered you for Golazo FC. To get started, please create your password by clicking the button below:</p>
            <a href="${link}" class="button">Create Your Password</a>
            <p class="footer">If you did not expect this email, please ignore it.</p>
        </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"Golazo FC" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Create Your Golazo FC Player Account",
        html: htmlContent,
    });
};
