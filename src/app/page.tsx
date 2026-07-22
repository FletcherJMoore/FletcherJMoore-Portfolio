import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";

const sections = [
  {
    href: "/professional",
    kicker: "The work",
    title: "Professional",
    desc: "Career, projects, education, certifications, and the skills behind them.",
    accent: "from-[var(--color-violet-bright)] to-[var(--color-cyan)]",
  },
  {
    href: "/personal",
    kicker: "The human",
    title: "Personal",
    desc: "Hobbies, interests, and a little about who I am outside of work.",
    accent: "from-[var(--color-magenta)] to-[var(--color-amber)]",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Two sides, <span className="text-gradient">one story</span>
          </h2>
          <p className="mt-3 max-w-xl text-[var(--color-muted)]">
            Explore whichever version of me you came here to meet.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.1}>
              <Link
                href={s.href}
                className="card card-hover group relative block overflow-hidden p-8"
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
                />
                <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                  {s.kicker}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold">
                  {s.title}
                </h3>
                <p className="mt-3 text-[var(--color-muted)]">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-paper)]">
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
