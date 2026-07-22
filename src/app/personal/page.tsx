import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { aboutMe, hobbies, funFacts } from "@/lib/data";

export const metadata: Metadata = { title: "Personal" };

export default function PersonalPage() {
  return (
    <>
      <PageHeader
        eyebrow="The human"
        title="Personal"
        intro="A little about who I am when I'm not at a keyboard — what I love, what I do for fun, and what makes me, me."
      />

      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-28">
        {/* ABOUT */}
        <section className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold">About me</h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
                {aboutMe}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card relative grid aspect-square place-items-center overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-violet)]/25 via-transparent to-[var(--color-magenta)]/25" />
              <div className="animate-float text-center">
                <span className="text-7xl">👋</span>
                <p className="mt-4 text-sm text-[var(--color-muted)]">
                  Drop a photo of yourself here
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* HOBBIES */}
        <section>
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Hobbies &amp; <span className="text-gradient">interests</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05}>
                <div className="card card-hover h-full p-6">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-surface-2)] text-3xl">
                    {h.emoji}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FUN FACTS */}
        <section>
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Quick <span className="text-gradient">facts</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {funFacts.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="card flex items-center gap-4 p-5">
                  <span className="font-display text-2xl font-bold text-gradient">
                    0{i + 1}
                  </span>
                  <p className="text-[var(--color-muted)]">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="card flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Let&apos;s be friends
            </h2>
            <p className="max-w-md text-[var(--color-muted)]">
              If any of this resonates, I&apos;d love to connect.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-[var(--color-magenta)] to-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Say hello
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
