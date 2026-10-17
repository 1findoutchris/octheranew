import { products } from "@/data/products";
import { pricingPlans } from "@/data/pricing";
import { providers } from "@/data/providers";

/**
 * Context carried from a CTA to /contact. Every value is checked against an
 * allowlist; anything else is dropped, so the query string can never inject
 * arbitrary text into the page, a mailto subject or an inquiry record.
 */
export const requestTypes = {
  sales: "Talk to sales",
  walkthrough: "Request a walkthrough",
  quote: "Request a quote",
  sandbox: "Discuss sandbox access",
  "provider-access": "Ask about provider access",
} as const;

export type RequestType = keyof typeof requestTypes;

export type ContactContext = {
  request: RequestType;
  product?: string;
  plan?: string;
  provider?: string;
};

const productNames = new Map(products.map((p) => [p.slug, p.name]));
const planNames = new Map(pricingPlans.map((p) => [p.slug, p.name]));
const providerNames = new Map(providers.map((p) => [p.slug, p.name]));

export function contactHref(context: Partial<ContactContext> = {}): string {
  const params = new URLSearchParams();
  if (context.request && context.request !== "sales") params.set("request", context.request);
  if (context.product) params.set("product", context.product);
  if (context.plan) params.set("plan", context.plan);
  if (context.provider) params.set("provider", context.provider);
  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}

type ParamSource = { get(name: string): string | null };

export function parseContactContext(params: ParamSource): ContactContext {
  const request = params.get("request");
  const product = params.get("product");
  const plan = params.get("plan");
  const provider = params.get("provider");
  return {
    request: request && request in requestTypes ? (request as RequestType) : "sales",
    product: product && productNames.has(product) ? product : undefined,
    plan: plan && planNames.has(plan) ? plan : undefined,
    provider: provider && providerNames.has(provider) ? provider : undefined,
  };
}

/** Human-readable interest, e.g. "Sportsbook" or "White Label plan". */
export function describeInterest(context: ContactContext): string | undefined {
  const parts = [
    context.product && productNames.get(context.product),
    context.plan && `${planNames.get(context.plan)} plan`,
    context.provider && `${providerNames.get(context.provider)} (provider directory)`,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

export function emailSubject(context: ContactContext): string {
  const interest = describeInterest(context);
  const action = requestTypes[context.request];
  return interest ? `Octhera enquiry: ${action} - ${interest}` : `Octhera enquiry: ${action}`;
}

export function mailtoHref(email: string, context: ContactContext): string {
  return `mailto:${email}?subject=${encodeURIComponent(emailSubject(context))}`;
}
