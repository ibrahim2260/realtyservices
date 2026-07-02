import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/schemas";

const requestCounts = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (record.count >= 5) return true;
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

  const parsed = inquirySchema.safeParse(body);
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
        subject: `Listing Inquiry — ${data.listingAddress}`,
        html: `
          <h2>Listing Inquiry</h2>
          <table>
            <tr><td><strong>Property</strong></td><td>${data.listingAddress}</td></tr>
            <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${data.phone ?? "—"}</td></tr>
            <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
            <tr><td><strong>Requesting OM</strong></td><td>${data.requestOM ? "Yes" : "No"}</td></tr>
          </table>
        `,
      });
    }

    return NextResponse.json({ ok: true, message: "Your inquiry has been received. Michael Schneider's office will contact you within one business day." });
  } catch (err) {
    console.error("Inquiry form error:", err);
    return NextResponse.json({ ok: false, error: "Submission failed. Please call 347-205-2882." }, { status: 500 });
  }
}
