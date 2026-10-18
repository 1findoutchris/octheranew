import { after } from "next/server";
import { readInquiryConfig } from "@/lib/inquiry/config";
import { submitInquiry } from "@/lib/inquiry/service";
import { processOutbox } from "@/lib/inquiry/worker";
import { inquiryRuntime, logEvent } from "@/lib/inquiry/runtime";

/**
 * POST /api/inquiries: stores a website inquiry. Returns 404 while the
 * form is disabled, so nothing is collected until it is configured and
 * approved. Only POST is exported; other methods get 405 from Next.js.
 */
export async function POST(request: Request) {
  const config = readInquiryConfig();
  if (!config.enabled) return new Response(null, { status: 404 });

  const { store, mailer } = inquiryRuntime(config);
  // Railway's edge appends the client address to X-Forwarded-For; take the first hop.
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const result = await submitInquiry(
    {
      rawBody: await request.text(),
      contentType: request.headers.get("content-type"),
      origin: request.headers.get("origin"),
      host: request.headers.get("host"),
      clientIp,
    },
    {
      store,
      allowedOrigins: config.allowedOrigins,
      rateLimitSalt: config.rateLimitSalt,
      acknowledgement: config.acknowledgement,
      log: logEvent,
    }
  );

  if (result.status === 201) {
    // Try to notify sales straight away; failures stay queued for retry.
    after(async () => {
      try {
        await processOutbox({ store, mailer, mail: { salesTo: config.salesTo, from: config.from }, log: logEvent });
      } catch {
        logEvent({ event: "inquiry_worker_error" });
      }
    });
  }

  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (result.status === 429) headers["Retry-After"] = String(result.body.retryAfterSeconds);
  return Response.json(result.body, { status: result.status, headers });
}
