import { products } from "../../data/products";
import { pricingPlans } from "../../data/pricing";
import { providers } from "../../data/providers";
import { requestTypes, type RequestType } from "../contact-context";

/** Product interest values a visitor can choose, including "not sure". */
export const productInterestOptions: { value: string; label: string }[] = [
  ...products.map((p) => ({ value: p.slug, label: p.name })),
  { value: "not-sure", label: "Not sure yet" },
];

export const timelineOptions = [
  { value: "under-3-months", label: "Within 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "6-plus-months", label: "6 months or more" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const channelOptions = [
  { value: "email", label: "Email" },
  { value: "telegram", label: "Telegram" },
] as const;

export const limits = {
  name: 120,
  email: 254,
  company: 160,
  message: 2000,
  targetMarkets: 300,
  website: 300,
  sourcePath: 200,
  /** Whole request body, in bytes. */
  body: 16 * 1024,
} as const;

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  productInterest: string;
  message: string;
  targetMarkets?: string;
  website?: string;
  timeline?: string;
  preferredChannel?: string;
  requestType: RequestType;
  plan?: string;
  provider?: string;
  sourcePath?: string;
  idempotencyKey: string;
};

export type FieldErrors = Partial<Record<keyof InquiryInput | "form", string>>;

export type ValidationResult =
  | { ok: true; data: InquiryInput }
  | { ok: false; errors: FieldErrors; spam?: true };

const productSet = new Set(productInterestOptions.map((o) => o.value));
const planSet = new Set(pricingPlans.map((p) => p.slug));
const providerSet = new Set(providers.map((p) => p.slug));
const timelineSet = new Set<string>(timelineOptions.map((o) => o.value));
const channelSet = new Set<string>(channelOptions.map((o) => o.value));

// Pragmatic address check: one @, a dotted domain, no whitespace or control
// characters. Free-mail domains are deliberately accepted.
const emailPattern = /^[^\s@<>()"',;:\\]+@[^\s@<>()"',;:\\]+\.[^\s@<>()"',;:\\]{2,}$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const pathPattern = /^\/[a-z0-9\-/]*$/;
// C0 controls except tab/newline/carriage return, plus DEL and C1 controls.
const controlChars = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
const lineBreaks = /[\r\n\u2028\u2029]/;

function text(value: unknown): string {
  return typeof value === "string" ? value.replace(controlChars, "").trim() : "";
}

/**
 * Server-side validation for an inquiry submission. Browser validation is
 * only a convenience; this is the authority. Single-line fields reject line
 * breaks outright, which closes off email header injection via the
 * subject or Reply-To.
 */
export function validateInquiry(raw: unknown): ValidationResult {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ok: false, errors: { form: "The request could not be read." } };
  }
  const input = raw as Record<string, unknown>;
  const errors: FieldErrors = {};

  // Honeypot: a hidden field people never fill in.
  if (text(input.fax) !== "") return { ok: false, errors: { form: "The request could not be accepted." }, spam: true };

  const singleLine = (key: keyof InquiryInput, label: string, max: number, required: boolean) => {
    const raw = typeof input[key] === "string" ? (input[key] as string) : "";
    const value = text(raw);
    if (lineBreaks.test(raw.trim())) errors[key] = `${label} must be on one line.`;
    else if (required && !value) errors[key] = `Enter ${label.toLowerCase()}.`;
    else if (value.length > max) errors[key] = `${label} must be ${max} characters or fewer.`;
    return value || undefined;
  };

  const name = singleLine("name", "Your name", limits.name, true);
  const email = singleLine("email", "Your work email", limits.email, true);
  if (email && !errors.email && !emailPattern.test(email)) {
    errors.email = "Enter an email address in the format name@company.com.";
  }
  const company = singleLine("company", "Company", limits.company, true);

  const productInterest = text(input.productInterest);
  if (!productInterest) errors.productInterest = "Choose what you're interested in.";
  else if (!productSet.has(productInterest)) errors.productInterest = "Choose an option from the list.";

  const message = text(input.message);
  if (!message) errors.message = "Tell us briefly what you need.";
  else if (message.length > limits.message) errors.message = `Message must be ${limits.message} characters or fewer.`;

  const targetMarkets = singleLine("targetMarkets", "Target markets", limits.targetMarkets, false);
  let website = singleLine("website", "Website", limits.website, false);
  if (website && !errors.website) {
    const withScheme = /^https?:\/\//i.test(website) ? website : `https://${website}`;
    try {
      const url = new URL(withScheme);
      if (!url.hostname.includes(".")) throw new Error("no tld");
      website = url.toString();
    } catch {
      errors.website = "Enter a website address such as example.com.";
    }
  }

  const timeline = text(input.timeline) || undefined;
  if (timeline && !timelineSet.has(timeline)) errors.timeline = "Choose an option from the list.";
  const preferredChannel = text(input.preferredChannel) || undefined;
  if (preferredChannel && !channelSet.has(preferredChannel)) errors.preferredChannel = "Choose an option from the list.";

  // Context fields come from the page and are untrusted: unknown values are dropped, not errors.
  const requestRaw = text(input.requestType);
  const requestType = (requestRaw in requestTypes ? requestRaw : "sales") as RequestType;
  const planRaw = text(input.plan);
  const providerRaw = text(input.provider);
  const pathRaw = text(input.sourcePath).split(/[?#]/)[0].toLowerCase();

  const idempotencyKey = text(input.idempotencyKey);
  if (!uuidPattern.test(idempotencyKey)) errors.form = "The form expired. Reload the page and try again.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name: name!,
      email: email!,
      company: company!,
      productInterest,
      message,
      targetMarkets,
      website,
      timeline,
      preferredChannel,
      requestType,
      plan: planSet.has(planRaw) ? planRaw : undefined,
      provider: providerSet.has(providerRaw) ? providerRaw : undefined,
      sourcePath: pathPattern.test(pathRaw) && pathRaw.length <= limits.sourcePath ? pathRaw : undefined,
      idempotencyKey: idempotencyKey.toLowerCase(),
    },
  };
}

export function productInterestLabel(value: string): string {
  return productInterestOptions.find((o) => o.value === value)?.label ?? value;
}
