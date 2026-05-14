// === FILE: lib/admin-auth.ts ===
// Uses Web Crypto API — compatible with both Edge runtime (middleware) and Node.js 18+

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET environment variable is not set");
  return secret;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return arrayBufferToBase64Url(sig);
}

async function hmacVerify(
  message: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const expected = await hmacSign(message, secret);
  const enc = new TextEncoder();
  const a = enc.encode(expected);
  const b = enc.encode(signature);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Creates a signed session token: `username:timestamp:hmac`. */
export async function createAdminSession(username: string): Promise<string> {
  const secret = getSecret();
  const timestamp = Date.now().toString();
  const message = `${username}:${timestamp}`;
  const signature = await hmacSign(message, secret);
  return `${message}:${signature}`;
}

/** Verifies a session token and checks it is less than 24 hours old. */
export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const secret = getSecret();
    const lastColon = token.lastIndexOf(":");
    if (lastColon === -1) return false;

    const signature = token.substring(lastColon + 1);
    const message = token.substring(0, lastColon);

    // message format: username:timestamp
    const colonIdx = message.indexOf(":");
    if (colonIdx === -1) return false;

    const timestamp = parseInt(message.substring(colonIdx + 1), 10);
    if (isNaN(timestamp)) return false;

    const age = Date.now() - timestamp;
    if (age > 24 * 60 * 60 * 1000) return false;

    return await hmacVerify(message, signature, secret);
  } catch {
    return false;
  }
}
