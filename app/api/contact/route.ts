import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_LEN = { name: 200, email: 320, subject: 300, message: 10000 };

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type MailEnv = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  mailTo: string;
  from: string;
};

function getMailEnv(): MailEnv | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO?.trim();
  if (!host || !user || !pass || !mailTo) {
    return null;
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = process.env.MAIL_FROM?.trim() || user;
  return { host, port, secure, user, pass, mailTo, from };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = asTrimmedString(body?.name, MAX_LEN.name);
    const email = asTrimmedString(body?.email, MAX_LEN.email);
    const subject = asTrimmedString(body?.subject, MAX_LEN.subject);
    const message = asTrimmedString(body?.message, MAX_LEN.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const mailEnv = getMailEnv();
    if (!mailEnv) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and MAIL_TO (see .env.example).",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: mailEnv.host,
      port: mailEnv.port,
      secure: mailEnv.secure,
      auth: { user: mailEnv.user, pass: mailEnv.pass },
    });

    const text = `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
    const html = `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(
      subject
    )}</p><pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(message)}</pre>`;

    await transporter.sendMail({
      from: `"Portfolio contact" <${mailEnv.from}>`,
      to: mailEnv.mailTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error && process.env.NODE_ENV === "development"
        ? err.message
        : "Could not send message";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
