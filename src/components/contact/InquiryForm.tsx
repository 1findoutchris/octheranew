"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseContactContext } from "@/lib/contact-context";
import { Button } from "@/components/ui/Button";

type Option = { value: string; label: string };
type Field = "name" | "email" | "company" | "productInterest" | "message" | "targetMarkets" | "website" | "timeline" | "preferredChannel";
type Errors = Partial<Record<Field | "form", string>>;

const fieldOrder: Field[] = ["name", "email", "company", "productInterest", "message", "targetMarkets", "website", "timeline", "preferredChannel"];
const fieldLabels: Record<Field, string> = {
  name: "Your name",
  email: "Work email",
  company: "Company",
  productInterest: "What you're interested in",
  message: "What do you need?",
  targetMarkets: "Target markets",
  website: "Company website",
  timeline: "Timeline",
  preferredChannel: "Preferred contact channel",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clientValidate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your work email.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter an email address in the format name@company.com.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.productInterest) errors.productInterest = "Choose what you're interested in.";
  if (!values.message.trim()) errors.message = "Tell us briefly what you need.";
  else if (values.message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";
  return errors;
}

function sourcePath(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const ref = new URL(document.referrer);
    return ref.origin === window.location.origin ? ref.pathname : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Short sales inquiry form. Success is shown only after the server confirms
 * the inquiry was stored; email and Telegram stay visible as fallbacks.
 */
export function InquiryForm({
  privacyUrl,
  salesEmail,
  productOptions,
  timelineOptions,
  channelOptions,
}: {
  privacyUrl: string;
  salesEmail: string;
  productOptions: Option[];
  timelineOptions: readonly Option[];
  channelOptions: readonly Option[];
}) {
  const context = parseContactContext(useSearchParams());
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    company: "",
    productInterest: context.product ?? "",
    message: "",
    targetMarkets: "",
    website: "",
    timeline: "",
    preferredChannel: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  // One key per logical submission: a retry after a lost response returns the same reference.
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const showErrors = (next: Errors) => {
    setErrors(next);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    const clientErrors = clientValidate(values);
    if (Object.keys(clientErrors).length) return showErrors(clientErrors);

    setPending(true);
    setErrors({});
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          requestType: context.request,
          plan: context.plan,
          provider: context.provider,
          sourcePath: sourcePath(),
          idempotencyKey,
          fax: honeypotRef.current?.value ?? "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 200 || res.status === 201) {
        setReference(body.reference);
        requestAnimationFrame(() => successRef.current?.focus());
      } else if (res.status === 400 && body.fields) {
        showErrors(body.fields);
      } else if (res.status === 429) {
        showErrors({ form: `Too many requests from your connection. Please try again later, or email ${salesEmail}.` });
      } else {
        showErrors({ form: `We couldn't record your request. Your details are still in the form; try again, or email ${salesEmail}.` });
      }
    } catch {
      showErrors({ form: `We couldn't reach the server. Your details are still in the form; try again, or email ${salesEmail}.` });
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-xl border border-border bg-success-bg p-5 text-success-fg md:p-6">
        <h3 className="text-lg font-semibold">Your request has been recorded</h3>
        <p className="mt-2 text-base">
          Reference <strong className="font-mono">{reference}</strong>. A member of our sales team will review it and
          follow up. If you need to add anything, email{" "}
          <a href={`mailto:${salesEmail}`} className="underline">
            {salesEmail}
          </a>{" "}
          and quote your reference.
        </p>
        <button
          type="button"
          className="mt-4 min-h-11 text-base underline"
          onClick={() => {
            setReference(null);
            setIdempotencyKey(crypto.randomUUID());
            setValues((v) => ({ ...v, message: "" }));
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  const errorList = fieldOrder.filter((f) => errors[f]);
  const describedBy = (field: Field, help?: boolean) =>
    [help ? `${field}-help` : null, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;
  const inputClass = "mt-2 min-h-11 w-full rounded-xl border border-border-strong bg-elevated px-3 text-base text-foreground aria-invalid:border-error-fg";

  const textField = (field: Field, props: React.InputHTMLAttributes<HTMLInputElement>, optional = false, help?: string) => (
    <div>
      <label htmlFor={field} className="block text-base font-medium text-foreground">
        {fieldLabels[field]}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {help && (
        <p id={`${field}-help`} className="mt-1 text-sm text-muted">
          {help}
        </p>
      )}
      <input
        id={field}
        name={field}
        value={values[field]}
        onChange={update(field)}
        aria-invalid={errors[field] ? true : undefined}
        aria-describedby={describedBy(field, !!help)}
        className={inputClass}
        {...props}
      />
      {errors[field] && (
        <p id={`${field}-error`} className="mt-1 text-sm font-medium text-error-fg">
          {errors[field]}
        </p>
      )}
    </div>
  );

  const selectField = (field: Field, options: readonly Option[], optional = false, placeholder = "Choose an option") => (
    <div>
      <label htmlFor={field} className="block text-base font-medium text-foreground">
        {fieldLabels[field]}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      <select
        id={field}
        name={field}
        value={values[field]}
        onChange={update(field)}
        aria-invalid={errors[field] ? true : undefined}
        aria-describedby={describedBy(field)}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {errors[field] && (
        <p id={`${field}-error`} className="mt-1 text-sm font-medium text-error-fg">
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="form-required-note" className="space-y-5">
      {(errorList.length > 0 || errors.form) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-error-fg bg-error-bg p-4 text-error-fg">
          <h3 className="text-base font-semibold">
            {errorList.length > 0 ? "Please correct the following" : "Your request wasn't sent"}
          </h3>
          {errors.form && <p className="mt-1 text-base">{errors.form}</p>}
          {errorList.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-base">
              {errorList.map((f) => (
                <li key={f}>
                  <a href={`#${f}`} className="underline">
                    {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p id="form-required-note" className="text-sm text-muted">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {textField("name", { type: "text", autoComplete: "name", maxLength: 120 })}
        {textField("email", { type: "email", autoComplete: "email", inputMode: "email", maxLength: 254 })}
        {textField("company", { type: "text", autoComplete: "organization", maxLength: 160 })}
        {selectField("productInterest", productOptions)}
      </div>

      <div>
        <label htmlFor="message" className="block text-base font-medium text-foreground">
          {fieldLabels.message}
        </label>
        <p id="message-help" className="mt-1 text-sm text-muted">
          A few lines on your platform, markets and what you want to launch. Up to 2000 characters.
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
          className="mt-2 w-full rounded-xl border border-border-strong bg-elevated p-3 text-base text-foreground aria-invalid:border-error-fg"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm font-medium text-error-fg">
            {errors.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {textField("targetMarkets", { type: "text", maxLength: 300 }, true, "Countries or regions you plan to serve.")}
        {textField("website", { type: "url", autoComplete: "url", inputMode: "url", maxLength: 300 }, true)}
        {selectField("timeline", timelineOptions, true)}
        {selectField("preferredChannel", channelOptions, true)}
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fax">Fax</label>
        <input ref={honeypotRef} id="fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-muted">
        We use these details only to respond to your enquiry. See our{" "}
        <a href={privacyUrl} className="link-inline">
          privacy notice
        </a>
        .
      </p>

      <Button type="submit" size="lg" loading={pending}>
        {pending ? "Sending request…" : "Send request"}
      </Button>
    </form>
  );
}
