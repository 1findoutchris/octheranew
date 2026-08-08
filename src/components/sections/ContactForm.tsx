"use client";

import { useState, type FormEvent } from "react";
import { contactProductOptions, launchTimelineOptions } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  timeline: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.company.trim()) next.company = "Company is required.";
    if (!values.email.trim()) next.email = "Work email is required.";
    else if (!emailPattern.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.country.trim()) next.country = "Country is required.";
    if (!values.product) next.product = "Select a product.";
    if (!values.message.trim()) next.message = "Tell us a bit about your business.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-surface border-glow flex flex-col items-center rounded-2xl p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary-bright">
          <Icon name="check" className="size-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Thanks, {values.fullName.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Your details have been captured. A member of the Octhera team will
          follow up regarding {values.product.toLowerCase()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName}>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputClass(!!errors.fullName)}
            placeholder="Jordan Smith"
          />
        </Field>

        <Field label="Company" error={errors.company}>
          <input
            type="text"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass(!!errors.company)}
            placeholder="Company name"
          />
        </Field>

        <Field label="Work Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone / Telegram" error={errors.phone} optional>
          <input
            type="text"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="+1 555 000 0000 or @handle"
          />
        </Field>

        <Field label="Country" error={errors.country}>
          <input
            type="text"
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
            className={inputClass(!!errors.country)}
            placeholder="Country"
          />
        </Field>

        <Field label="Interested Product" error={errors.product}>
          <select
            value={values.product}
            onChange={(e) => update("product", e.target.value)}
            className={inputClass(!!errors.product)}
          >
            <option value="">Select a product</option>
            {contactProductOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estimated Launch Timeline" error={errors.timeline} optional className="sm:col-span-2">
          <select
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={inputClass(!!errors.timeline)}
          >
            <option value="">Select a timeline</option>
            {launchTimelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" error={errors.message} className="sm:col-span-2">
          <textarea
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            className={inputClass(!!errors.message)}
            placeholder="Tell us about your business and what you're looking to launch or improve."
          />
        </Field>
      </div>

      <button type="submit" className="btn-primary mt-7 h-12 w-full rounded-full text-sm font-medium sm:w-auto sm:px-10">
        Talk to Octhera
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-medium text-muted">
        {label}
        {optional && <span className="text-muted/60"> (optional)</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-primary-bright">{error}</p>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none",
    hasError ? "border-primary" : "border-border focus:border-primary-border",
  ].join(" ");
}
