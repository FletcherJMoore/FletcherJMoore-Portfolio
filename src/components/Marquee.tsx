import { skillGroups } from "@/lib/data";

export default function Marquee() {
  const items = skillGroups.flatMap((g) => g.skills);
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-ink-2)] py-5">
      <div className="flex w-max animate-marquee gap-4">
        {row.map((skill, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 text-sm font-medium text-[var(--color-muted)]"
          >
            {skill}
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--color-ink-2)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--color-ink-2)] to-transparent" />
    </div>
  );
}
