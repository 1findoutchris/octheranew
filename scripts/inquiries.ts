/**
 * Staff tool for website inquiries. Runs only where DATABASE_URL (and SMTP
 * settings for `work`) are available, e.g. `railway run npm run inquiries -- list`.
 * There is deliberately no public HTTP endpoint for any of this.
 *
 *   migrate                     apply migrations/*.sql
 *   list [--status S] [--limit N]   recent inquiries with delivery state
 *   show OCT-YYYYMMDD-XXXX      one inquiry, including message and delivery state
 *   retry OCT-YYYYMMDD-XXXX     requeue failed/dead notifications, then run once
 *   work                        send due notifications once (schedule this)
 *   delete OCT-YYYYMMDD-XXXX    erase an inquiry (e.g. a deletion request)
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "pg";
import { PgInquiryStore } from "../src/lib/inquiry/pg-store";
import { SmtpMailer } from "../src/lib/inquiry/mailer";
import { processOutbox } from "../src/lib/inquiry/worker";
import { referencePattern } from "../src/lib/inquiry/reference";
import type { OutboxStatus } from "../src/lib/inquiry/types";

const [command, ...args] = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

function need(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`${name} is not set.`);
    process.exit(2);
  }
  return value;
}

function reference(): string {
  const ref = args[0]?.toUpperCase();
  if (!ref || !referencePattern.test(ref)) {
    console.error("Give a reference like OCT-20261017-A7K4.");
    process.exit(2);
  }
  return ref;
}

async function main() {
  const pool = new Pool({ connectionString: need("DATABASE_URL") });
  const store = new PgInquiryStore(pool);
  const worker = () =>
    processOutbox({
      store,
      mailer: new SmtpMailer({
        host: need("SMTP_HOST"),
        port: Number(need("SMTP_PORT")),
        secure: process.env.SMTP_SECURE !== "false",
        user: need("SMTP_USER"),
        pass: need("SMTP_PASS"),
      }),
      mail: { salesTo: process.env.INQUIRY_SALES_TO || "sales@octhera.org", from: need("INQUIRY_MAIL_FROM") },
      log: (e) => console.log(JSON.stringify(e)),
    });

  try {
    switch (command) {
      case "migrate": {
        const dir = join(process.cwd(), "migrations");
        for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
          await pool.query(readFileSync(join(dir, file), "utf8"));
          console.log(`applied ${file}`);
        }
        break;
      }
      case "list": {
        const rows = await store.listInquiries({
          status: flag("status") as OutboxStatus | undefined,
          limit: Number(flag("limit") ?? 20),
        });
        for (const r of rows) {
          const jobs = r.jobs.map((j) => `${j.kind}=${j.status}(${j.attempts})`).join(" ");
          console.log(`${r.reference}  ${r.createdAt.toISOString()}  ${r.productInterest}  ${r.company}  ${jobs}`);
        }
        if (rows.length === 0) console.log("No inquiries.");
        break;
      }
      case "show": {
        const inquiry = await store.findByReference(reference());
        console.log(inquiry ? JSON.stringify(inquiry, null, 2) : "Not found.");
        break;
      }
      case "retry": {
        const count = await store.requeue(reference());
        console.log(`Requeued ${count} job(s).`);
        if (count > 0) console.log(JSON.stringify(await worker()));
        break;
      }
      case "work":
        console.log(JSON.stringify(await worker()));
        break;
      case "delete":
        console.log((await store.deleteInquiry(reference())) ? "Deleted." : "Not found.");
        break;
      default:
        console.error("Commands: migrate | list [--status pending|failed|dead|accepted] | show REF | retry REF | work | delete REF");
        process.exitCode = 2;
    }
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
