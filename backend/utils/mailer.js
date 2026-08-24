import nodemailer from "nodemailer";

const createTransporter = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email delivery is not configured");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendVerificationEmail = async ({ email, name, token }) => {
  const transporter = createTransporter();
  const frontendUrl = (process.env.FRONTEND_URI || "http://localhost:5173").split(",")[0].trim();
  const verificationUrl = `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "Verify your JobConnect email",
    text: `Hi ${name}, verify your JobConnect account here: ${verificationUrl}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a"><h2>Welcome to JobConnect, ${name}</h2><p>Confirm your email to start applying for roles.</p><p><a href="${verificationUrl}" style="background:#0f766e;color:#fff;padding:12px 18px;border-radius:6px;text-decoration:none">Verify email</a></p><p>This link expires in 24 hours.</p></div>`,
  });
};
