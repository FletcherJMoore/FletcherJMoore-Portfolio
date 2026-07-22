import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  getExperience,
  getProjects,
  getCredentials,
  getSkillGroups,
  getSettings,
} from "@/lib/content";

export const metadata: Metadata = { title: "Professional" };
export const dynamic = "force-dynamic";

const accentMap: Record<string, string> = {
  violet: "var(--color-violet)",
  magenta: "var(--color-magenta)",
  cyan: "var(--color-cyan)",
  lime: "var(--color-lime)",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {children}
      </h2>
    </Reveal>
  );
}

export default async function ProfessionalPage() {
  const [experience, projects, credentials, skillGroups, site] =
    await Promise.all([
      getExperience(),
      getProjects(),
      getCredentials(),
      getSkillGroups(),
      getSettings(),
    ]);
  const careerGoals = site.careerGoals;

  return (
    <>
      <PageHeader
        eyebrow="The work"
        title="Professional"
        intro="My career so far, where I'm headed, the projects I'm proud of, and the skills and credentials behind them."
      />

      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-28">
        {/* GOALS */}
        <section>
          <SectionTitle>Where I&apos;m headed</SectionTitle>
          <Reveal delay={0.1}>
            <div className="card mt-6 p-8">
              <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                {careerGoals}
              </p>
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section>
          <SectionTitle>Career</SectionTitle>
          <div className="mt-8 space-y-6 border-l border-[var(--color-border)] pl-6 sm:pl-8">
            {experience.map((job, i) => (
              <Reveal key={job.company + i} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[33px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-violet-bright)] sm:-left-[41px]" />
                  <div className="card p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-bold">
                        {job.title}
                      </h3>
                      <span className="pill text-[var(--color-muted)]">
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-1 font-medium text-[var(--color-violet-bright)]">
                      {job.company}
                      {job.location && (
                        <span className="text-[var(--color-muted)]">
                          {" "}
                          · {job.location}
                        </span>
                      )}
                    </p>
                    <p className="mt-3 text-[var(--color-muted)]">
                      {job.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {job.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm text-[var(--color-paper)]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-magenta)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <article
                  className="card card-hover flex h-full flex-col p-6"
                  style={{
                    borderTopColor: accentMap[p.accent],
                    borderTopWidth: 3,
                  }}
                >
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 flex-1 text-[var(--color-muted)]">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-[var(--color-surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-4 text-sm font-semibold">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        Live ↗
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-[var(--color-muted)]"
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTS */}
        <section>
          <SectionTitle>Education &amp; Certifications</SectionTitle>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {credentials.map((c, i) => (
              <Reveal key={c.title + i} delay={i * 0.05}>
                <div className="card flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-surface-2)] text-xl">
                    {c.type === "education" ? "🎓" : "📜"}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                      {c.type} · {c.year}
                    </p>
                    <h3 className="mt-0.5 font-semibold">{c.title}</h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      {c.issuer}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g, i) => (
              <Reveal key={g.category} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <h3 className="font-display text-lg font-bold text-gradient">
                    {g.category}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {g.skills.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-[var(--color-muted)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="card flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Want the full picture?
            </h2>
            <p className="max-w-md text-[var(--color-muted)]">
              Grab my resume or reach out — I&apos;d love to hear about what
              you&apos;re building.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/resume"
                className="rounded-full bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
              >
                View resume
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-violet)]"
              >
                Contact me
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
