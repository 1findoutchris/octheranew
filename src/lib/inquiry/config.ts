/**
 * Inquiry form configuration, read from server environment variables only.
 * The form is OFF unless INQUIRY_FORM_ENABLED=true AND every required
 * setting is present, including a published privacy notice URL. See
 * docs/inquiry-pipeline.md.
 */
export type InquiryConfig =
  | { enabled: false; missing: string[] }
  | {
      enabled: true;
      databaseUrl: string;
      salesTo: string;
      from: string;
      privacyUrl: string;
      acknowledgement: boolean;
      rateLimitSalt: string;
      allowedOrigins: string[];
      smtp: { host: string; port: number; secure: boolean; user: string; pass: string };
    };

const required = [
  "DATABASE_URL",
  "INQUIRY_MAIL_FROM",
  "INQUIRY_PRIVACY_URL",
  "INQUIRY_RATE_LIMIT_SALT",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
] as const;

export function readInquiryConfig(env: Record<string, string | undefined> = process.env): InquiryConfig {
  if (env.INQUIRY_FORM_ENABLED !== "true") return { enabled: false, missing: ["INQUIRY_FORM_ENABLED"] };
  const missing = required.filter((key) => !env[key]);
  if (missing.length > 0) return { enabled: false, missing };
  return {
    enabled: true,
    databaseUrl: env.DATABASE_URL!,
    salesTo: env.INQUIRY_SALES_TO || "sales@octhera.org",
    from: env.INQUIRY_MAIL_FROM!,
    privacyUrl: env.INQUIRY_PRIVACY_URL!,
    acknowledgement: env.INQUIRY_ACK_ENABLED === "true",
    rateLimitSalt: env.INQUIRY_RATE_LIMIT_SALT!,
    allowedOrigins: ["https://octhera.org", ...(env.INQUIRY_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean)],
    smtp: {
      host: env.SMTP_HOST!,
      port: Number(env.SMTP_PORT),
      secure: env.SMTP_SECURE !== "false",
      user: env.SMTP_USER!,
      pass: env.SMTP_PASS!,
    },
  };
}
