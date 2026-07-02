import { NextRequest, NextResponse } from "next/server";
import { valuationSchema } from "@/lib/schemas";

// Rate limiting (in-memory — use Redis/Upstash in production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const maxRequests = 5;

  const record = requestCounts.get(ip);
  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + window });
    return false;
  }
  if (record.count >= maxRequests) return true;
  record.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = valuationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot check
  if (data.honeypot) {
    return NextResponse.json({ ok: true, message: "Request received." });
  }

  try {
    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Schneider Realty Services <noreply@schneiderrealty.com>",
        to: ["michael@schneiderrealty.com"],
        replyTo: data.email,
        subject: `New Valuation Request — ${data.propertyAddress}`,
        html: `
          <h2>New Valuation Request</h2>
          <table>
            <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
            <tr><td><strong>Property Address</strong></td><td>${data.propertyAddress}</td></tr>
            <tr><td><strong>Asset Type</strong></td><td>${data.assetType}</td></tr>
            <tr><td><strong>Approximate Size</strong></td><td>${data.approximateSize ?? "—"}</td></tr>
            <tr><td><strong>Timeframe</strong></td><td>${data.timeframe}</td></tr>
            <tr><td><strong>Message</strong></td><td>${data.message ?? "—"}</td></tr>
          </table>
        `,
      });
    }

    // Write lead to Sanity (when credentials available)
    // if (sanityWriteClient) {
    //   await sanityWriteClient.create({
    //     _type: "lead",
    //     source: "valuation",
    //     createdAt: new Date().toISOString(),
    //     name: data.name,
    //     email: data.email,
    //     phone: data.phone,
    //     propertyAddress: data.propertyAddress,
    //     assetTypes: [data.assetType],
    //     timeframe: data.timeframe,
    //     message: data.message,
    //     status: "new",
    //   });
    // }

    return NextResponse.json({
      ok: true,
      message:
        "Your valuation request has been received. Michael Schneider's office will contact you within one business day.",
    });
  } catch (err) {
    console.error("Valuation form error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to submit. Please call us directly at 347-205-2882." },
      { status: 500 }
    );
  }
}
