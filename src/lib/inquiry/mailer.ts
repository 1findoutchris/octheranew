import nodemailer from "nodemailer";
import type { MailMessage } from "./notification";

/** Thrown by a Mailer. `retryable=false` sends the job straight to dead-letter. */
export class MailError extends Error {
  constructor(message: string, readonly retryable: boolean) {
    super(message);
  }
}

export interface Mailer {
  /**
   * Hands the message to the mail provider. Resolving means the provider
   * ACCEPTED it; it is not evidence the message reached a mailbox.
   */
  send(message: MailMessage): Promise<{ providerMessageId: string | null }>;
}

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

/**
 * SMTP adapter for an owner-approved transactional provider. Credentials
 * come from server environment variables only and are never logged.
 */
export class SmtpMailer implements Mailer {
  private readonly transport;

  constructor(config: SmtpConfig) {
    this.transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }

  async send(message: MailMessage) {
    try {
      const info = await this.transport.sendMail({
        from: message.from,
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        headers: { "X-Octhera-Idempotency-Key": message.idempotencyKey },
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      return { providerMessageId: info.messageId ?? null };
    } catch (e) {
      const err = e as { responseCode?: number; code?: string; message?: string };
      // 5xx SMTP replies are permanent (bad recipient, auth, policy); the rest is transient.
      const permanent = typeof err.responseCode === "number" && err.responseCode >= 500 && err.responseCode < 600;
      throw new MailError(`SMTP ${err.responseCode ?? err.code ?? "error"}`, !permanent);
    }
  }
}
