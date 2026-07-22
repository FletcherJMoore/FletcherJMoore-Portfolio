"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { site, homeStats } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.span variants={item} className="pill text-[var(--color-muted)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-lime)]" />
          Available for new opportunities
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">{site.name}</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-display text-2xl font-medium text-[var(--color-muted)] sm:text-3xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {site.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/professional"
            className="rounded-full bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
          >
            View my work
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-violet)]"
          >
            Get in touch
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {homeStats.map((s) => (
            <div
              key={s.label}
              className="card px-5 py-6 text-center"
            >
              <dt className="font-display text-3xl font-bold text-gradient">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
