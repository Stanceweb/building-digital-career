// === FILE: lib/access-id.ts ===

/**
 * Unambiguous charset — excludes 0/O, 1/I, L to prevent visual confusion
 * when reading or typing the code at an entrance. 32 characters.
 */
const CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/**
 * Generates a cryptographically random access ID in the format:
 *   BDC-2025-XXXXXXX  (7 characters from CHARSET)
 *
 * 32^7 ≈ 34.4 billion combinations.
 * Uses rejection sampling to eliminate modulo bias.
 * Works in browser, Edge runtime, and Node.js 18+.
 */
export function generateAccessId(): string {
  const length = 7;
  const chars: string[] = [];
  const charsetLen = CHARSET.length; // 32
  // Max byte value that avoids modulo bias: floor(256 / 32) * 32 = 224
  const maxValid = Math.floor(256 / charsetLen) * charsetLen;

  while (chars.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length * 2));
    for (let i = 0; i < bytes.length; i++) {
      if (chars.length >= length) break;
      if (bytes[i] < maxValid) chars.push(CHARSET[bytes[i] % charsetLen]);
    }
  }

  const year = new Date().getFullYear();
  return `BDC-${year}-${chars.join("")}`;
}
