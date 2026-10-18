"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/data/site";
import {
  describeInterest,
  mailtoHref,
  parseContactContext,
  requestTypes,
  type ContactContext,
} from "@/lib/contact-context";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const defaultContext: ContactContext = { request: "sales" };

/** Email and Telegram actions. Rendered on the server with no context (also the no-JS view). */
export function ContactActionsPanel({ context = defaultContext }: { context?: ContactContext }) {
  const interest = describeInterest(context);
  const hasContext = !!interest || context.request !== "sales";

  return (
    <div>
      {hasContext && (
        <div className="mb-6 rounded-xl border border-border-strong bg-elevated p-4">
          <p className="text-sm text-muted">Your enquiry</p>
          <p className="mt-1 text-base font-medium text-foreground">
            {requestTypes[context.request]}
            {interest && <> · {interest}</>}
          </p>
          <Link href="/contact" className="link-inline mt-2 inline-block text-sm">
            Clear and choose a general enquiry
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={mailtoHref(siteConfig.salesEmail, context)} size="lg">
          <Icon name="mail" className="size-5" />
          Email sales
        </Button>
        <Button href={siteConfig.telegram} external size="lg" variant="secondary">
          <Icon name="telegram" className="size-5" />
          Message our team on Telegram
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Or write to{" "}
        <a href={`mailto:${siteConfig.salesEmail}`} className="link-inline">
          {siteConfig.salesEmail}
        </a>
        . Email opens your own mail app, and nothing is sent until you send it there.
      </p>
    </div>
  );
}

export function ContactActions() {
  const context = parseContactContext(useSearchParams());
  return <ContactActionsPanel context={context} />;
}
