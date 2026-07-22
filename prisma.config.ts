import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Read directly (not via env()) so `prisma generate` doesn't crash at
    // build time when DATABASE_URL isn't present — generation is offline.
    // The URL is only actually needed at runtime for migrate/seed/queries.
    url: process.env.DATABASE_URL,
  },
});
