// Local SMTP sink for the inquiry-form E2E suite. Accepts every message on
// 127.0.0.1 and appends it to a JSON-lines file; nothing leaves the machine.
import { SMTPServer } from "smtp-server";
import { appendFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = Number(process.env.SMTP_SINK_PORT || 2526);
const out = process.env.SMTP_SINK_FILE || join(tmpdir(), "octhera-smtp-sink.jsonl");
writeFileSync(out, "");

const server = new SMTPServer({
  authOptional: true,
  disabledCommands: ["STARTTLS"],
  onAuth(_auth, _session, cb) {
    cb(null, { user: "test" });
  },
  onData(stream, session, cb) {
    let raw = "";
    stream.on("data", (c) => (raw += c));
    stream.on("end", () => {
      appendFileSync(out, JSON.stringify({ from: session.envelope.mailFrom.address, to: session.envelope.rcptTo.map((r) => r.address), raw }) + "\n");
      cb();
    });
  },
});
server.listen(port, "127.0.0.1", () => console.log(`smtp sink on ${port}`));
