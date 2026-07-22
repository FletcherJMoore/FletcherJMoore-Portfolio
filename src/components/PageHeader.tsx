import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:pt-24">
      <Reveal>
        <span className="pill text-[var(--color-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-magenta)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
