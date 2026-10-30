import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const DEFAULT_FROM = "Siddiq Portfolio <onboarding@resend.dev>";
const DEFAULT_TO = "siddiq080806@gmail.com";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Please provide a valid email address."))
    .refine((value) => value.length <= 200, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be under 5000 characters."),
  // Honeypot: real users never fill this in.
  website: z.string().optional(),
});

/**
 * Lightweight in-memory rate limiting.
 * Serverless instances are ephemeral, so this is a best-effort guard against
 * rapid repeat submissions from the same client, not a distributed limiter.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#0F0C0D;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0F0C0D;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1A1416;border:1px solid #2E2427;border-radius:3px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #2E2427;">
                <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C2434B;font-weight:700;">
                  Siddiq Portfolio · New Inquiry
                </p>
                <h1 style="margin:10px 0 0;font-size:22px;line-height:1.2;color:#F5EDE9;font-weight:600;">
                  ${safeName} wants to connect.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#B8A8A4;font-weight:700;">
                  From
                </p>
                <p style="margin:0 0 24px;font-size:15px;color:#F5EDE9;">
                  ${safeName} &lt;<a href="mailto:${safeEmail}" style="color:#C2434B;text-decoration:none;">${safeEmail}</a>&gt;
                </p>

                <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#B8A8A4;font-weight:700;">
                  Message
                </p>
                <div style="margin:0;padding:18px;background:#0F0C0D;border:1px solid #2E2427;border-radius:2px;font-size:14px;line-height:1.7;color:#E8DCD7;">
                  ${safeMessage}
                </div>

                <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#B8A8A4;">
                  Reply directly to this email to respond to ${safeName}.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #2E2427;">
                <p style="margin:0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#6F6266;">
                  Sent via the contact form at siddiq portfolio
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "The email service is not configured yet. Please try again later or email me directly.",
      },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message ?? "Please check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped: pretend success so bots do not learn the rule.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New inquiry from ${name}`,
      replyTo: email,
      text: `New inquiry from ${name} <${email}>\n\n${message}`,
      html: buildEmailHtml({ name, email, message }),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "The message could not be delivered right now. Please try again or email me directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "The message could not be delivered right now. Please try again or email me directly.",
      },
      { status: 500 }
    );
  }
}
