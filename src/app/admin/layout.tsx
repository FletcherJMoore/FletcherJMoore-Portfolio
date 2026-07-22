import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/auth";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

const sections = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/credentials", label: "Education & Certs" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/stats", label: "Home Stats" },
  { href: "/admin/hobbies", label: "Hobbies" },
  { href: "/admin/facts", label: "Fun Facts" },
  { href: "/admin/contact", label: "Contact Info" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();

  // Login page renders bare (no admin chrome).
  if (!authed) return <>{children}</>;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-bold">
            <span className="text-gradient">Admin</span>
          </span>
          <Link
            href="/"
            className="pill text-[var(--color-muted)]"
            target="_blank"
          >
            View site ↗
          </Link>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)]"
          >
            Log out
          </button>
        </form>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-paper)]"
          >
            {s.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
