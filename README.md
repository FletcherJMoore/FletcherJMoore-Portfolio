# Portfolio

A bold, colorful, database-backed personal portfolio built with **Next.js 16**,
**Prisma 7 + Postgres**, and a password-protected **admin panel** so you can keep
every section up to date without touching code or redeploying.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma 7** ORM with the `pg` driver adapter → **Postgres**
- **jose** for the signed admin-session cookie
- **motion** for animation
- Hosted on **Railway** (auto-deploys from `main`)

## Pages

| Route | What it is |
| --- | --- |
| `/` | Animated hero, headline stats, skills marquee |
| `/professional` | Career timeline, goals, projects, education/certs, skills |
| `/personal` | About me, hobbies, fun facts |
| `/resume` | Inline PDF preview + download |
| `/contact` | Message form (mailto) + contact channels |
| `/admin` | **Password-protected** dashboard to edit all of the above |

All public pages read from the database at request time. If the database is
empty or unreachable, they gracefully fall back to the placeholder defaults in
`src/lib/data.ts`, so the site never hard-crashes.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `ADMIN_PASSWORD` | The password you type at `/admin/login` |
| `AUTH_SECRET` | Long random string used to sign the session cookie |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Local development

```bash
npm install
# put your Railway Postgres "Public" URL + admin values in .env
npm run db:deploy   # apply the schema to your database
npm run db:seed     # (optional) load the placeholder content to start from
npm run dev         # http://localhost:3000
```

Handy scripts:

- `npm run db:studio` — open Prisma Studio, a visual DB editor
- `npm run db:migrate` — create a new migration after editing `prisma/schema.prisma`
- `npm run db:seed` — load starter content (only fills empty tables)

## The admin panel

1. Visit `/admin` and sign in with `ADMIN_PASSWORD`.
2. Edit any section — Settings, Experience, Projects, Skills, Education,
   Home Stats, Hobbies, Fun Facts, Contact Info.
3. Saves are instant and appear on the live site immediately.

The `order` field on list items controls their display order (lowest first).

## Deploying to Railway

1. Add the GitHub repo as a Railway service (it auto-detects Next.js).
2. Add a **Postgres** database to the project.
3. In the app service's **Variables**, set:
   - `DATABASE_URL` = reference the DB, e.g. `${{Postgres.DATABASE_URL}}`
   - `ADMIN_PASSWORD` = your chosen password
   - `AUTH_SECRET` = a long random string
4. Deploy. The `start` script runs `prisma migrate deploy` automatically, so the
   database schema is created/updated on every deploy.
5. (Once) load starter content by running `npm run db:seed` locally against the
   Railway `DATABASE_URL`, or just start adding content through `/admin`.

Every push to `main` triggers a new Railway deploy.
