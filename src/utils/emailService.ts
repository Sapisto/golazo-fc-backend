import nodemailer from "nodemailer";

export const sendPlayerInviteEmail = async (
  email: string,
  rawPassword: string,
  firstName: string
) => {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";

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
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Golazo FC</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      }
      h1 {
        color: #1a1a1a;
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        color: #555555;
        font-size: 16px;
        line-height: 1.6;
        margin: 10px 0;
      }
      .credentials {
        background-color: #f1f5f9;
        border-left: 4px solid #007bff;
        padding: 15px;
        margin: 20px 0;
        border-radius: 6px;
        font-family: monospace;
        color: #1a1a1a;
      }
      a.button {
        display: inline-block;
        padding: 14px 28px;
        font-size: 16px;
        color: #ffffff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 8px;
        margin-top: 20px;
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
      @media (max-width: 600px) {
        .container {
          padding: 20px;
          margin: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Golazo FC, ${firstName}!</h1>
      <p>Your account has been created. Below are your login credentials:</p>
      <div class="credentials">
        Email: <strong>${email}</strong><br/>
        Password: <strong>${rawPassword}</strong>
      </div>
      <p>We recommend that you change your password after your first login.</p>
      <a href="${FRONTEND_URL}/login" class="button">Login to Your Account</a>
      <p class="footer">If you did not expect this email, please ignore it.</p>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Golazo FC" <no-reply@golazofc.com>`,
    to: email,
    subject: "Your Golazo FC Player Account Credentials",
    html: htmlContent,
  });
};
