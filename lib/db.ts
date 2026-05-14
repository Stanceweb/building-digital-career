// === FILE: lib/db.ts ===
// Server-only PostgreSQL connection pool. Never import in client components.

import { Pool } from "pg";

let pool: Pool | null = null;

/** Lazy singleton pool — created once, reused across requests. */
export function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Strip any sslmode param from the URL so our ssl config always takes
  // precedence — prevents conflicts when the URL contains ?sslmode=require
  // but the server uses a self-signed certificate.
  const cleanUrl = connectionString
    .replace(/([?&])sslmode=[^&]*/g, "$1")
    .replace(/[?&]$/, "");

  const isRemote =
    !cleanUrl.includes("localhost") && !cleanUrl.includes("127.0.0.1");

  pool = new Pool({
    connectionString: cleanUrl,
    // Remote: encrypt traffic but accept self-signed certs.
    // Local: no SSL needed.
    ssl: isRemote ? { rejectUnauthorized: false } : false,
  });

  return pool;
}
