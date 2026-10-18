import { productInterestLabel, timelineOptions, channelOptions } from "./validation";
import { requestTypes } from "../contact-context";
import type { StoredInquiry } from "./types";

export type MailMessage = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  /** Lets the provider de-duplicate a resend of the same logical message. */
  idempotencyKey: string;
};

export type MailConfig = {
  /** Server-configured recipient, e.g. sales@octhera.org. Never from the client. */
  salesTo: string;
  /** Authenticated, owner-approved sender. The visitor is never the From. */
  from: string;
};

function oneLine(value: string, max: number): string {
  return value.replace(/[\r\n\u2028\u2029]+/g, " ").trim().slice(0, max);
}

const label = <T extends { value: string; label: string }>(options: readonly T[], value?: string) =>
  value ? (options.find((o) => o.value === value)?.label ?? value) : undefined;

/**
 * Plain-text notification to sales. No HTML is generated, so visitor input
 * can't inject markup or links that render; Reply-To is the visitor so a
 * normal reply goes to them from the sales mailbox.
 */
export function buildSalesNotification(inquiry: StoredInquiry, config: MailConfig): MailMessage {
  const product = productInterestLabel(inquiry.productInterest);
  const subject = `[Octhera enquiry ${inquiry.reference}] ${product} — ${oneLine(inquiry.company, 80)}`;
  const rows: [string, string | undefined][] = [
    ["Reference", inquiry.reference],
    ["Request", requestTypes[inquiry.requestType]],
    ["Product interest", product],
    ["Plan", inquiry.plan],
    ["Provider", inquiry.provider],
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Company", inquiry.company],
    ["Target markets", inquiry.targetMarkets],
    ["Website", inquiry.website],
    ["Timeline", label(timelineOptions, inquiry.timeline)],
    ["Preferred channel", label(channelOptions, inquiry.preferredChannel)],
    ["Submitted from", inquiry.sourcePath],
    ["Received", inquiry.createdAt.toISOString()],
  ];
  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${oneLine(v!, 400)}`),
    "",
    "Message:",
    inquiry.message,
    "",
    "Reply to this email to answer the visitor (Reply-To is their address).",
  ].join("\n");

  return {
    to: config.salesTo,
    from: config.from,
    replyTo: inquiry.email,
    subject,
    text,
    idempotencyKey: `${inquiry.reference}:sales_notification`,
  };
}

/** Optional receipt to the visitor: reference and next step only, no links or promises. */
export function buildAcknowledgement(inquiry: StoredInquiry, config: MailConfig): MailMessage {
  return {
    to: inquiry.email,
    from: config.from,
    replyTo: config.salesTo,
    subject: `We received your Octhera enquiry (${inquiry.reference})`,
    text: [
      `Thank you for contacting Octhera. Your reference is ${inquiry.reference}.`,
      "",
      "A member of our sales team will review your request and follow up.",
      `If you need to add anything, reply to this email or write to ${config.salesTo} and quote your reference.`,
    ].join("\n"),
    idempotencyKey: `${inquiry.reference}:acknowledgement`,
  };
}
