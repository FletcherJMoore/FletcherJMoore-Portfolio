import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

async function safeCount(fn: () => Promise<number>): Promise<number | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const [jobs, projects, credentials, skills, stats, hobbies, facts, contacts] =
    await Promise.all([
      safeCount(() => prisma.job.count()),
      safeCount(() => prisma.project.count()),
      safeCount(() => prisma.credential.count()),
      safeCount(() => prisma.skillGroup.count()),
      safeCount(() => prisma.stat.count()),
      safeCount(() => prisma.hobby.count()),
      safeCount(() => prisma.funFact.count()),
      safeCount(() => prisma.contactMethod.count()),
    ]);

  const dbDown = jobs === null;

  const cards = [
    { href: "/admin/settings", label: "Settings", desc: "Name, tagline, bio, socials, résumé link", count: null },
    { href: "/admin/experience", label: "Experience", desc: "Work history timeline", count: jobs },
    { href: "/admin/projects", label: "Projects", desc: "Portfolio projects", count: projects },
    { href: "/admin/credentials", label: "Education & Certs", desc: "Degrees and certifications", count: credentials },
    { href: "/admin/skills", label: "Skills", desc: "Skill groups", count: skills },
    { href: "/admin/stats", label: "Home Stats", desc: "Headline numbers", count: stats },
    { href: "/admin/hobbies", label: "Hobbies", desc: "Personal interests", count: hobbies },
    { href: "/admin/facts", label: "Fun Facts", desc: "Quick personal facts", count: facts },
    { href: "/admin/contact", label: "Contact Info", desc: "Ways to reach you", count: contacts },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Manage your <span className="text-gradient">content</span>
      </h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Edit any section below. Changes go live on your site immediately.
      </p>

      {dbDown && (
        <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-300">
          Can&apos;t reach the database. Check that <code>DATABASE_URL</code> is
          set and that you&apos;ve run the migration + seed. Your public site is
          showing placeholder content until then.
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card card-hover flex items-start justify-between gap-4 p-5"
          >
            <div>
              <h2 className="font-display text-lg font-bold">{c.label}</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{c.desc}</p>
            </div>
            {c.count !== null && (
              <span className="shrink-0 rounded-full bg-[var(--color-surface-2)] px-2.5 py-1 text-xs font-semibold text-[var(--color-muted)]">
                {c.count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
