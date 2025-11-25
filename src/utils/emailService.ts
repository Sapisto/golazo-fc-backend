import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  newPassword: string,
  firstName?: string
) => {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

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
  <title>Password Reset - Golazo FC</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #e9ecf1;
      margin: 0;
      padding: 40px 0;
    }

    .wrapper {
      max-width: 650px;
      margin: 0 auto;
      background: #dfe3e8;
      padding: 35px 25px;
      border-radius: 18px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    }

    .container {
      background: #ffffff;
      border-radius: 14px;
      padding: 35px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    h1 {
      color: #111;
      font-size: 26px;
      margin-bottom: 14px;
      font-weight: 600;
    }

    p {
      color: #444;
      font-size: 16px;
      line-height: 1.6;
      margin: 14px 0;
    }

    .credentials {
      background-color: #f3f6fa;
      border-left: 4px solid #dc3545;
      padding: 16px;
      margin: 22px 0;
      border-radius: 8px;
      font-family: monospace;
      color: #1a1a1a;
    }

    a.button {
      display: inline-block;
      padding: 14px 28px;
      font-size: 16px;
      color: #fff;
      background-color: #dc3545;
      text-decoration: none;
      border-radius: 8px;
      margin-top: 30px;
    }

    a.button:hover {
      background-color: #b02a37;
    }

    .footer {
      margin-top: 35px;
      font-size: 13px;
      color: #7f7f7f;
      text-align: center;
    }

    @media (max-width: 600px) {
      .wrapper { padding: 20px; }
      .container { padding: 25px; }
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">
      <h1>Password Reset Request ${firstName ? ", " + firstName : ""}</h1>

      <p>You requested a password reset. Use the temporary password below:</p>

      <div class="credentials">
        Temporary Password: <strong>${newPassword}</strong>
      </div>

      <p>Please change your password immediately after logging in.</p>

      <a href="${FRONTEND_URL}/login" class="button">Login</a>

      <p class="footer">If you did not request this, please contact support immediately.</p>
    </div>
  </div>
</body>
</html>
`;



  await transporter.sendMail({
    from: `"Golazo FC" <no-reply@golazofc.com>`,
    to: email,
    subject: "Your Password Reset Instructions",
    html: htmlContent,
  });
};


export const sendPlayerInviteEmail = async (
  email: string,
  rawPassword: string,
  firstName: string,
  username: string
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
      background: #e9ecf1;
      margin: 0;
      padding: 40px 0;
    }

    .wrapper {
      max-width: 650px;
      margin: 0 auto;
      background: #dfe3e8;
      padding: 35px 25px;
      border-radius: 18px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    }

    .container {
      background: #ffffff;
      border-radius: 14px;
      padding: 35px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    h1 {
      color: #111;
      font-size: 26px;
      margin-bottom: 14px;
      font-weight: 600;
    }

    p {
      color: #444;
      font-size: 16px;
      line-height: 1.6;
      margin: 14px 0;
    }

    .credentials {
      background-color: #f3f6fa;
      border-left: 4px solid #007bff;
      padding: 16px;
      margin: 22px 0;
      border-radius: 8px;
      font-family: monospace;
      color: #1a1a1a;
    }

    a.button {
      display: inline-block;
      padding: 14px 28px;
      font-size: 16px;
      color: #fff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 8px;
      margin-top: 30px;
    }

    a.button:hover {
      background-color: #0056b3;
    }

    .footer {
      margin-top: 35px;
      font-size: 13px;
      color: #7f7f7f;
      text-align: center;
    }

    @media (max-width: 600px) {
      .wrapper { padding: 20px; }
      .container { padding: 25px; }
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <h1>Welcome to Golazo FC, ${firstName}!</h1>

      <p>Your player account has been created. Use your login details below:</p>

      <div class="credentials">
        Email: <strong>${email}</strong><br/>
        Username: <strong>${username}</strong><br/>
        Password: <strong>${rawPassword}</strong>
      </div>

      <p>We strongly recommend changing your password after your first login.</p>

      <a href="${FRONTEND_URL}/login" class="button">Login to Your Account</a>

      <p class="footer">If you did not expect this email, please ignore it.</p>

    </div>
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
