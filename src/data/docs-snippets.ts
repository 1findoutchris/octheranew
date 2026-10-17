/**
 * Code shown on /docs. Kept as plain strings so the page can show exactly
 * what tests/unit/docs-snippets.test.ts executes. Facts come from the
 * existing integration guide; nothing here describes behaviour the
 * production API has not documented.
 */

export const authHeaders = `Content-Type: application/json
Authorization: Bearer {YOUR_API_KEY}`;

export const launchRequest = `{
  "member_account": "player_001",
  "game_uid": "JILI_SLOT_001",
  "balance": 500.00,
  "home_url": "https://your-site.com"
}`;

export const launchResponse = `{
  "code": 0,
  "msg": "Success",
  "payload": {
    "game_launch_url": "https://api.octhera.com/play?token=SESSION_CODE_XYZ"
  }
}`;

export const callbackPayload = `{
  "serial_number": "uuid-txn-id-1234",
  "currency": "USD",
  "game_uid": "JILI_SLOT_001",
  "member_account": "player_123",
  "win_amount": "150.00",
  "bet_amount": "100.00",
  "timestamp": "1631459081871",
  "game_round": "round_id_555",
  "data": null
}`;

export const callbackResponse = `{
  "code": 0,
  "msg": "Success",
  "balance": 550.00
}`;

/**
 * Signature check. It validates the header's type, format and length
 * BEFORE the constant-time comparison, so malformed input returns false
 * instead of throwing.
 */
export const verifySignatureFunction = `const crypto = require("node:crypto");

// Returns true only for a valid HMAC-SHA256 hex signature of the raw body.
function verifySignature(rawBody, signatureHeader, secret) {
  if (typeof signatureHeader !== "string") return false;
  const signature = signatureHeader.trim();
  // SHA-256 in hex is exactly 64 characters.
  if (!/^[0-9a-f]{64}$/i.test(signature)) return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest();
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}`;

export const verifySignatureUsage = `// Example with Express: keep the raw bytes for verification,
// and parse JSON only after the signature checks out.
app.post("/octhera/callback", express.raw({ type: "application/json" }), (req, res) => {
  if (!verifySignature(req.body, req.get("x-signature"), process.env.OCTHERA_SECRET_KEY)) {
    return res.status(401).send("Invalid signature");
  }
  const event = JSON.parse(req.body.toString("utf8"));
  // ...apply bet_amount / win_amount once per serial_number, then reply:
  res.json({ code: 0, msg: "Success", balance: newBalance });
});`;
