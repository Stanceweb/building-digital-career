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
  pool = new Pool({
    connectionString,
    // Accept self-signed certs while still encrypting the connection.
    // Data in transit is encrypted; certificate authority validation is skipped.
    ssl: connectionString.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });
  return pool;
}
