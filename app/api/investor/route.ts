import { NextRequest, NextResponse } from "next/server";
import { investorSchema } from "@/lib/schemas";

const requestCounts = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (record.count >= 3) return true;
  record.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = investorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed.", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  if (data.honeypot) return NextResponse.json({ ok: true });

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Schneider Realty Services <noreply@schneiderrealty.com>",
        to: ["michael@schneiderrealty.com"],
        replyTo: data.email,
        subject: `New Investor List Signup — ${data.name}`,
        html: `
          <h2>New Investor Signup</h2>
          <table>
            <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${data.phone ?? "—"}</td></tr>
            <tr><td><strong>Company</strong></td><td>${data.company ?? "—"}</td></tr>
            <tr><td><strong>Asset Types</strong></td><td>${data.assetTypes.join(", ")}</td></tr>
            <tr><td><strong>Price Range</strong></td><td>$${data.priceMin.toLocaleString()} – $${data.priceMax.toLocaleString()}</td></tr>
            <tr><td><strong>Notes</strong></td><td>${data.message ?? "—"}</td></tr>
          </table>
        `,
      });
    }

    return NextResponse.json({ ok: true, message: "You're on the list. We'll be in touch when off-market opportunities match your criteria." });
  } catch (err) {
    console.error("Investor form error:", err);
    return NextResponse.json({ ok: false, error: "Submission failed. Please call 347-205-2882." }, { status: 500 });
  }
}
